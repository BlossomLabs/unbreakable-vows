// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import fs from "fs";
import { config, ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // fs.unlinkSync(`${config.paths.artifacts}/contracts/contractAddress.ts`);

  // We get the contract to deploy
  const YourContract = await ethers.getContractFactory("YourContract");
  const contract = await YourContract.deploy();
  await contract.deployed();
  console.log("YourContract deployed to:", contract.address);

  saveFrontendFiles(contract.address, "YourContract");
}

// https://github.com/nomiclabs/hardhat-hackathon-boilerplate/blob/master/scripts/deploy.js
function saveFrontendFiles(contractAddress: string, contractName: string) {
  //   fs.writeFileSync(
  //     `${config.paths.artifacts}/contracts/contractAddress.ts`,
  //     `export const ${contractName} = '${contractAddress}'\nexport const ${nftContractName} = '${nftContractAddress}'\n`
  //   );
  fs.writeFileSync(
    `${config.paths.artifacts}/contracts/contractAddress.ts`,
    `export const ${contractName} = '${contractAddress}'\n`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
