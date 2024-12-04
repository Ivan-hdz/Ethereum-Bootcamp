import {describe, it, beforeEach, before} from 'mocha';
import {expect} from 'chai'
import hre from 'hardhat';
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers';

describe('Faucet contract', () => {

    async function deployContractFixture() {
        const Faucet = await hre.ethers.getContractFactory('Faucet');
        const faucet = await Faucet.deploy();
        const [ownerAddress, accountOne, accountTwo] = await hre.ethers.getSigners();
        return {faucet, ownerAddress, accountOne, accountTwo};
    }
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    it('should be deployed', async () => {
        const {faucet} = await loadFixture(deployContractFixture);
        expect(faucet).not.to.be.undefined
    });

    it('should receive ether', async () => {
        const {faucet, ownerAddress} = await loadFixture(deployContractFixture);
        expect(await faucet.balance()).to.be.equals(hre.ethers.parseEther('0'));
        const txResponse = await ownerAddress.sendTransaction({
            to: faucet.getAddress(),
            value: hre.ethers.parseEther('5')
        });
        const txReceipt = await txResponse.wait();
        expect(await faucet.balance()).to.be.equals(hre.ethers.parseEther('5'));
    })
});