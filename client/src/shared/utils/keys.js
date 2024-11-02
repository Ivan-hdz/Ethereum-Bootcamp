import {secp256k1} from 'ethereum-cryptography/secp256k1';
import {hexToBytes, toHex, utf8ToBytes} from 'ethereum-cryptography/utils';
import {keccak256} from 'ethereum-cryptography/keccak';

export const getAddressFromPk = (pk,hexFormat)  => {
    const binaryPk = hexToBytes(pk)
    console.log(pk, binaryPk)
    console.log(secp256k1.getPublicKey(binaryPk))
    const addrr = keccak256(secp256k1.getPublicKey(binaryPk)).slice(-20);
    console.log(pk, '-', toHex(addrr));
    return hexFormat ? `0x${toHex(addrr)}` : addrr;

}

