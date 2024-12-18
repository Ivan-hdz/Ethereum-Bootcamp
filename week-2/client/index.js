const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');
const serverUrl = 'http://localhost:1225';

const readline = require('node:readline/promises');
const { stdin: input, stdout: output, exit } = require('node:process');
const rl = readline.createInterface({ input, output });

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 
  const name = await rl.question('What is your name?: ');
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name
  });

  console.log({ gift });
  exit(0)
}

main();