import {secp256k1} from 'ethereum-cryptography/secp256k1'
import {keccak256} from 'ethereum-cryptography/keccak';
import {toHex, utf8ToBytes} from 'ethereum-cryptography/utils'
export const signData = (pk, data) => {
    const dataHash = keccak256(utf8ToBytes(JSON.stringify(data)));
    const dataSign = secp256k1.sign(toHex(dataHash), pk);
    console.log(dataSign)
    return [toHex(dataHash), dataSign.toCompactHex(), dataSign.recovery];
}