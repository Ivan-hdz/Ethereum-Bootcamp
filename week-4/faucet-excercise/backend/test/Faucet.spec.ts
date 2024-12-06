import { Faucet } from "./../typechain-types/Faucet";
import { describe, it, beforeEach, before } from "mocha";
import { expect } from "chai";
import hre from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";

describe("Faucet contract", () => {
  async function fixture() {
    const Faucet = await hre.ethers.getContractFactory("Faucet");
    const faucet = await Faucet.deploy();
    const [ownerAddress, accountDest] = await hre.ethers.getSigners();
    return { faucet, ownerAddress, accountDest };
  }
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  it("should be deployed", async () => {
    const { faucet } = await loadFixture(fixture);
    expect(faucet).not.to.be.undefined;
  });

  it("should receive ether", async () => {
    const { faucet, ownerAddress } = await loadFixture(fixture);
    expect(await faucet.balance()).to.be.equals(hre.ethers.parseEther("0"));
    const txResponse = await ownerAddress.sendTransaction({
      to: faucet.getAddress(),
      value: hre.ethers.parseEther("5"),
    });
    const txReceipt = await txResponse.wait();
    expect(await faucet.balance()).to.be.equals(hre.ethers.parseEther("5"));
  });
  // Owner will pay for the transactions
  describe("should send ether to user", () => {
    it("contract with insufficient funds to transfer and requested amount less/equal  1 ETH", async () => {
      const { faucet, ownerAddress, accountDest } = await loadFixture(fixture);
      await expect(
        faucet
          .connect(ownerAddress)
          .requestEther(accountDest, hre.ethers.parseEther("0.5"))
      ).to.be.revertedWith("Insufficient balance in contract");
      await expect(
        faucet
          .connect(ownerAddress)
          .requestEther(accountDest, hre.ethers.parseEther("1"))
      ).to.be.revertedWith("Insufficient balance in contract");
    });
    it("contract with insufficient funds to transfer and requested amount more than  1 ETH", async () => {
      const { faucet, ownerAddress, accountDest } = await loadFixture(fixture);
      await expect(
        faucet
          .connect(ownerAddress)
          .requestEther(accountDest, hre.ethers.parseEther("1.5"))
      ).to.be.revertedWith("Max quantity per transaction reached");
    });
    it("contract with sufficient funds and requested amount requested more than 1 ETH", async () => {
      const { faucet, ownerAddress, accountDest } = await loadFixture(fixture);
      const txResp = await ownerAddress.sendTransaction({
        to: faucet.getAddress(),
        value: hre.ethers.parseEther("5"),
      });
      await txResp.wait();
      await expect(
        faucet
          .connect(ownerAddress)
          .requestEther(accountDest, hre.ethers.parseEther("1.1"))
      ).to.be.revertedWith("Max quantity per transaction reached");
    });
    it("contract with sufficient funds and requested amount less/equal  1 ETH", async () => {
      const { faucet, ownerAddress, accountDest } = await loadFixture(fixture);
      const txResp = await ownerAddress.sendTransaction({
        to: faucet.getAddress(),
        value: hre.ethers.parseEther("5"),
      });
      await txResp.wait();
      const accDestBalance = await accountDest.provider.getBalance(
        accountDest.getAddress()
      );
      const tx2Resp = await faucet
        .connect(ownerAddress)
        .requestEther(accountDest, hre.ethers.parseEther("0.7"));
      const tx2Recpt = await tx2Resp.wait();
      const accDestNewBalance = await accountDest.provider.getBalance(
        accountDest.getAddress()
      );
      expect(accDestNewBalance).to.be.equals(
        accDestBalance + hre.ethers.parseEther("0.7")
      );
    });
  });
});
