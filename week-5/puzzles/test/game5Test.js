const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const {randomBytes} = require('crypto');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();
    const [signer] = await ethers.getSigners();
    return { game, signer };
  }
  it('should be a winner', async function () {
    const { game, signer } = await loadFixture(deployContractAndSetVariables);
    const targetFirst20Bytes = Buffer.from('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf').slice(0,20).toString('hex');
    const numTarget = Number('0x'+targetFirst20Bytes);
    let i = 0;
    let succ = false;
    let privKey;
    let addrr;
    let wallet;
    while (succ === false) {
      try {
        privKey = randomBytes(32).toString('hex');
        i++;
        console.log(`Trying with pk (${i}) :`, privKey);
        wallet = new ethers.Wallet(privKey, ethers.provider);
        addrr = await wallet.getAddress();
        const addrrFirst20Bytes = Buffer.from(addrr).slice(0,20).toString('hex');
        const numAddrr =  Number('0x'+addrrFirst20Bytes);
        console.log(addrr, '=>', `${numAddrr} < ${numTarget}`, '=>', numAddrr < numTarget);
        succ = numAddrr < numTarget;
      } catch (error) {
        console.log(error)
      }
      await new Promise(res => setTimeout(() => res()));
    }
    let etherToSendForGas = '';
    if (ethers.version.includes('/5.')) {
      etherToSendForGas = ethers.utils.parseEther('1'); // backward compatibility 
    } else  {
      etherToSendForGas = ethers.parseEther('1');
    }
    // good luck
    const txResp = await signer.sendTransaction({
      value: etherToSendForGas,
      to: addrr
    });
    await txResp.wait();

    await game.connect(wallet).win();
 
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
