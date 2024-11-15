import { Alchemy, Network, Utils, Wallet } from 'alchemy-sdk';
import {config} from 'dotenv';

config();

const jsonRpc = new Alchemy({
    apiKey: process.env.JSON_RPC_KEY,
    network: Network.ETH_SEPOLIA
});

const wallet = new Wallet(
    process.env.SEPOLIA_PK
);

const nonce = await jsonRpc.core.getTransactionCount(
    wallet.address,
    'latest'
);

const transaction = {
    nonce,
    to: '0xF46C3c1fE0F39d072CEC647fe77Ad379386e919D',
    value: Utils.parseEther('0.001'),
    gasLimit: '21000',
    maxPriorityFeePerGas: Utils.parseUnits('5', 'gwei'),
    maxFeePerGas: Utils.parseUnits('20', 'gwei'),
    type: 2,
    chainId: 11155111
}
const signedTx = await wallet.signTransaction(transaction);
const txResp = await jsonRpc.core.sendTransaction(signedTx);
console.log('Tx submitted', txResp.hash);
await txResp.wait();
console.log('Tx confirmed');