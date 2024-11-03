const {secp256k1} = require('ethereum-cryptography/secp256k1');

// Verify that the hash signed was signed by the sender
export const validateSender = (hash, sign, rbit) => {
    let signature = secp256k1.Signature.fromCompact(sign);
    signature = signature.addRecoveryBit(rbit);
    const publicKey = signature.recoverPublicKey(hash);
    // With the folllowing step I only know that a hash of a m
    const signVerify = secp256k1.verify(signature, hash, publicKey.toHex());
    return 

}
export const validateIntegrity = () => {

}