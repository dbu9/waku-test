import { createLightNode, createEncoder, createDecoder,Protocols } from "@waku/sdk";
import protobuf from "protobufjs";


const sleep = async (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));
async function main() {
	
	const node = await createLightNode({ defaultBootstrap: true });

	await node.start();
	console.log("Node started");
	
	try {
		console.time("ts");
		await node.waitForPeers([Protocols.LightPush, Protocols.Filter], 40000);
		console.timeEnd("ts")
	} catch (e) {
		console.log("Error waiting for remote:" + e);	
	}
	
	if (node.isConnected() === false) {
		console.log("Could not connect");
		return;
	}

	//await sleep(30000);
	const remotePeers = await node.libp2p.peerStore.all();
	const remotePeerIds = remotePeers.map((peer) => peer.id.toString());
	console.log("peer:", node.peerId, "protocols:", node.protocols, ' peers:', remotePeerIds);
	
	const contentTopic = "/light-guide/2/message/proto";
	
	// Create a message encoder and decoder
	const encoder = createEncoder({ contentTopic });
	const decoder = createDecoder(contentTopic);
	const DataPacket = new protobuf.Type("DataPacket")
		.add(new protobuf.Field("timestamp", 1, "uint64"))
		.add(new protobuf.Field("sender", 2, "string"))
		.add(new protobuf.Field("message", 3, "string"));


	const protoMessage = DataPacket.create({
		timestamp: Date.now(),
		sender: "Alice2",
		message: "Hello, World!",
	});
	
	// Serialise the message using Protobuf
	const serialisedMessage = DataPacket.encode(protoMessage).finish();
	
	// Send the message using Light Push
	await node.lightPush.send(encoder, {
		payload: serialisedMessage,
	});
		
	console.log("Sent message");
		
	// Create the callback function
	const callback = (wakuMessage:any) => {
		// Check if there is a payload on the message
		if (!wakuMessage.payload) return;
		// Render the messageObj as desired in your application
		const messageObj = DataPacket.decode(wakuMessage.payload);
		console.log(messageObj);
	};

	// Create a Filter subscription
	const {error, subscription} = await node.filter.subscribe([decoder], callback);


	if (error) {
		// handle errors if happens
		throw Error(error);
	}
	await node.stop();
}
	

main();