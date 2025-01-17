# Requirements

Tested on

```
node v20.11.0

NAME="Linux Mint"
VERSION="20.3 (Una)"
ID=linuxmint
ID_LIKE=ubuntu
PRETTY_NAME="Linux Mint 20.3"
```

# Install and run

```bash
git clone https://github.com/dbu9/waku-test.git
cd waku-test
npm install
npm run start
```

# Output

```
npm run start

> waku-client@1.0.0 start
> tsx src/main.ts

Ignore WebSocket connection failures
Waku tries to discover peers and some of them are expected to fail
Node started
ts: 4.777s
peer: PeerId(12D3KooWKfmQuH95oid2qvH6Ca19ycbeTeuw8SwKXFSregzGiX2m) protocols: [
  '/ipfs/id/1.0.0',
  '/ipfs/ping/1.0.0',
  '/vac/waku/filter-push/2.0.0-beta1',
  '/vac/waku/metadata/1.0.0'
]  peers: [
  '16Uiu2HAmDCp8XJ9z1ev18zuv8NHekAsjNyezAvmMfFEJkiharitG',
  '16Uiu2HAkykgaECHswi3YKJ5dMLbq2kPVCo89fcyTd38UcQD6ej5W'
]
Sent message
/home/morpher/Documents/MyProjects/MOSHE/tradeflow/waku-client/src/main.ts:73
                throw Error(error);
                      ^


Error: No peer available
    at main (/home/morpher/Documents/MyProjects/MOSHE/tradeflow/waku-client/src/main.ts:73:9)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)

Node.js v20.11.0
```
