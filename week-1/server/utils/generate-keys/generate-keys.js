const secp = require('../../node_modules/ethereum-cryptography/secp256k1');
const {toHex} = require('../../node_modules/ethereum-cryptography/utils');
const {keccak256} = require('../../node_modules/ethereum-cryptography/keccak');
const {appendFileSync} = require('fs');
const path = require('path')
const filePath = path.join(__dirname, 'generated.txt');
const pk = secp.secp256k1.utils.randomPrivateKey();
const pubKey = secp.secp256k1.getPublicKey(pk).slice(1);
const addrr = keccak256(
    pubKey
).slice(-20); // Getting the last 20 bytes as address;
console.log('PK', toHex(pk));
console.log('Public', toHex(pubKey));
console.log('Address', '0x' +  toHex(addrr));
const line = `Pk: ${toHex(pk)}\nPublic: ${toHex(pubKey)}\nAddress: 0x${toHex(addrr)}\n\n`
appendFileSync(filePath, line, 'utf8')