// deploy/00_deploy_your_contract.js

const { ethers } = require("hardhat");

const localChainId = "31337";

// const sleep = (ms) =>
//   new Promise((r) =>
//     setTimeout(() => {
//       console.log(`waited for ${(ms / 1000).toFixed(3)} seconds`);
//       r();
//     }, ms)
//   );

module.exports = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();

  await deploy("UnbreakableVowFactory", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    log: true,
    waitConfirmations: 5,
    gasLimit: 10000000,
  });

  await deploy("Arbitrator", {
    // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
    from: deployer,
    log: true,
    waitConfirmations: 5,
    gasLimit: 10000000,
  });

  const UnbreakableVowFactory = await ethers.getContract(
    "UnbreakableVowFactory",
    deployer
  );
  const Arbitrator = await ethers.getContract("Arbitrator", deployer);

  await UnbreakableVowFactory.createUnbreakableVow(
    Arbitrator.address,
    "test vow",
    "0x697066733a516d5844416332357646486478436b687161584543477031575658595a676e5147546a55386f39536e3448616158",
    [
      "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C",
      "0x077E5fBe6F2EEb1083AcD5877b213d5F6eE071ba",
    ]
  );

  // await deploy("UnbreakableVow", {
  //   // Learn more about args here: https://www.npmjs.com/package/hardhat-deploy#deploymentsdeploy
  //   from: deployer,
  //   args: [
  //     "0xf0c8376065fadfacb706cafbaac96b321069c015",
  //     "Employment agreement",
  //     "0x00",
  //     [],
  //   ],
  //   log: true,
  //   waitConfirmations: 5,
  //   gasLimit: 10000000,
  // });

  // Getting a previously deployed contract
  // const UnbreakableVow = await ethers.getContract("UnbreakableVow", deployer);
  /*  await UnbreakableVow.setPurpose("Hello");
  
    To take ownership of unbreakableVow using the ownable library uncomment next line and add the 
    address you want to be the owner. 
    // await unbreakableVow.transferOwnership(YOUR_ADDRESS_HERE);

    //const unbreakableVow = await ethers.getContractAt('UnbreakableVow', "0xaAC799eC2d00C013f1F11c37E654e59B0429DF6A") //<-- if you want to instantiate a version of a contract at a specific address!
  */

  /*
  //If you want to send value to an address from the deployer
  const deployerWallet = ethers.provider.getSigner()
  await deployerWallet.sendTransaction({
    to: "0x34aA3F359A9D614239015126635CE7732c18fDF3",
    value: ethers.utils.parseEther("0.001")
  })
  */

  /*
  //If you want to send some ETH to a contract on deploy (make your constructor payable!)
  const yourContract = await deploy("YourContract", [], {
  value: ethers.utils.parseEther("0.05")
  });
  */

  /*
  //If you want to link a library into your contract:
  // reference: https://github.com/austintgriffith/scaffold-eth/blob/using-libraries-example/packages/hardhat/scripts/deploy.js#L19
  const yourContract = await deploy("YourContract", [], {}, {
   LibraryName: **LibraryAddress**
  });
  */

  // Verify from the command line by running `yarn verify`

  // You can also Verify your contracts with Etherscan here...
  // You don't want to verify on localhost
  // try {
  //   if (chainId !== localChainId) {
  //     await run("verify:verify", {
  //       address: YourContract.address,
  //       contract: "contracts/YourContract.sol:YourContract",
  //       contractArguments: [],
  //     });
  //   }
  // } catch (error) {
  //   console.error(error);
  // }
};
module.exports.tags = ["UnbreakableVow"];
