import fs from "fs-extra";
import hre from "hardhat";
import path from 'path';
const PUBLIC_FRONTEND_DIR = path.join(__dirname, '..', '..', 'faucet-example', 'public', 'contracts');
const deploy = async (contractName: string) => {
  const faucetFactory = await hre.ethers.getContractFactory(contractName);
  const faucetContract = await faucetFactory.deploy();
  const addrr = await faucetContract.getAddress();
  const faucetArtifactPath = path.join(__dirname, '..', 'artifacts', 'contracts', `${contractName}.sol`);
  fs.writeFileSync(
    path.join(faucetArtifactPath, `${contractName}.addr.json`),
    JSON.stringify({
        address: addrr
    }, null, 4)
  );
  fs.copySync(faucetArtifactPath, path.join(PUBLIC_FRONTEND_DIR, hre.artifacts.readArtifactSync(contractName).contractName))
  console.log(contractName, "contract deployed at", addrr);
};

deploy('Faucet')
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
