const secp = require('ethereum-cryptography/secp256k1');
const {toHex} = require('ethereum-cryptography/utils');
const {keccak256} = require('ethereum-cryptography/keccak');
const {appendFileSync} = require('fs');
const path = require('path')
const filePath = path.join(__dirname, 'generated.txt');
const pk = secp.secp256k1.utils.randomPrivateKey();
const pubKey = secp.secp256k1.getPublicKey(pk);
const addrr = keccak256(pubKey).slice(-20);
console.log('PK', toHex(pk));
console.log('Public', toHex(pubKey));
console.log('Address',  toHex(addrr));
const line = `Pk: ${toHex(pk)}\nPublic: ${toHex(pubKey)}\nAddress: ${toHex(addrr)}\n\n`
appendFileSync(filePath, line, 'utf8')