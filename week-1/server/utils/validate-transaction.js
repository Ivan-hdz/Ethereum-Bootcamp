import {secp256k1} from '../node_modules/ethereum-cryptography/secp256k1';
import {keccak256} from '../node_modules/ethereum-cryptography/keccak';
import {toHex, utf8ToBytes} from '../node_modules/ethereum-cryptography/utils';


// Verify that the hash signed was signed by the sender
export const validateSender = (hash, sign, rbit, sender) => {
    let signature = secp256k1.Signature.fromCompact(sign);
    signature = signature.addRecoveryBit(rbit);
    const publicKey = signature.recoverPublicKey(hash);
    // With the folllowing step I only know that a hash of a messages was 
    // signed by a public key
    const signVerify = secp256k1.verify(signature, hash, publicKey.toHex());
    if (signVerify === false) {
        return false; // The hash and its signature did not match
    }
    // We have to compare the address who signed the hash with the address who
    // has sent the transaction
    const addressFromSignature = '0x' + toHex(keccak256(publicKey.toRawBytes().slice(1))
    .slice(-20));
    return addressFromSignature === sender;

}
// Verify the integrity of data recieved
export const validateIntegrity = (sender, recipient, amount, hash) => {
    const hashFromData = toHex(keccak256(utf8ToBytes(JSON.stringify({
        sender,amount,recipient // Keeyp the same order as sent in order to get the same hash
    }))));
    return hashFromData === hash;
}