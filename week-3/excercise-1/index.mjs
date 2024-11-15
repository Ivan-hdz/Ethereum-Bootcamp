import {default as axios} from "axios";

const rpcUrl = 'https://eth-mainnet.g.alchemy.com/v2/D0I3-X1fp12YZpREf31KXxLGPxkQasbW'

axios.post(rpcUrl, {
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getBalance",
    params: [
        '0xf46c3c1fe0f39d072cec647fe77ad379386e919d',
        'latest'
    ]
}).then((v) => console.log(v.data));