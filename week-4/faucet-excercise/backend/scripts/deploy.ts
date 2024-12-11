import fs from "fs-extra";
import hre from "hardhat";
import path from 'path';
const OUTPUT_FRONTEND_DIR = path.join(__dirname, '..', '..', 'frontend', 'src', 'app', 'shared', 'contracts');

const deploy = async (contractName: string) => {
  const factory = await hre.ethers.getContractFactory(contractName);
  const contract = await factory.deploy();
  const addrr = await contract.getAddress();
  const artifactsPath = path.join(__dirname, '..', 'artifacts', 'contracts', `${contractName}.sol`);
  const typeFilePath = path.join(__dirname, '..', 'typechain-types');
  fs.writeFileSync(
    path.join(artifactsPath, `${contractName}.addr.json`),
    JSON.stringify({
        address: addrr
    }, null, 4)
  );
  const contractFrontOutputDir = path.join(OUTPUT_FRONTEND_DIR, contractName);
  const typesFrontOutputDir = path.join(OUTPUT_FRONTEND_DIR, 'types');
  fs.copySync(artifactsPath, contractFrontOutputDir);
  fs.copySync(typeFilePath, typesFrontOutputDir);
  console.log(contractName, "contract deployed at", addrr);
  console.log('Contract copied to', contractFrontOutputDir);
  console.log('Types copied to', typesFrontOutputDir);
  return contract;
};

deploy('Faucet')
  .then(async (c) => {
    const signer = await (new hre.ethers.JsonRpcProvider()).getSigner();
    const txResp = await signer.sendTransaction({
      to: c.getAddress(),
      value: hre.ethers.parseEther('5')
    });
    return txResp.wait();
  }).then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
