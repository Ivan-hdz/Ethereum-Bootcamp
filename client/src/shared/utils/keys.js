import {secp256k1} from 'ethereum-cryptography/secp256k1';
import {hexToBytes, toHex, utf8ToBytes} from 'ethereum-cryptography/utils';
import {keccak256} from 'ethereum-cryptography/keccak';

export const getAddressFromPk = (pk,hexFormat)  => {
    const binaryPk = hexToBytes(pk);
    // Removing the first byte
    const binaryPub = secp256k1.getPublicKey(binaryPk)
        .slice(1); 
    // Hashing the public key and returning the last 20 bytes from the hash as address
    const addrr = keccak256( 
        binaryPub
    ).slice(-40); 
    return hexFormat ? `0x${toHex(addrr)}` : addrr;

}

