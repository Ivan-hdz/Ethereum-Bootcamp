import fs from 'fs';
import hre from 'hardhat';

const deploy = async () => {
    const faucetFactory = await hre.ethers.getContractFactory('Faucet');
    const faucetContract = await faucetFactory.deploy();
    const addrr = await faucetContract.getAddress();
    console.log('Faucet contract deployed at', addrr);
    fs.writeFileSync('deployed_contracts.json', JSON.stringify({
        faucetAddress: addrr
    }));
}

deploy().then(() => process.exit(0))
.catch((e) => {
    console.error(e);
    process.exit(1);
})