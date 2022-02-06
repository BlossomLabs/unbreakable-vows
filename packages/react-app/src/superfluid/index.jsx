import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

export const sfInstance = async provider => {
  const sf = await Framework.create({
    networkName: "maticmum",
    provider: provider || new Web3Provider(window.ethereum),
  });

  return await sf.initialize();
};

function calculateFlowRate(amountInEther) {
  if (typeof Number(amountInEther) !== "number" || isNaN(Number(amountInEther)) === true) {
    console.log(typeof Number(amountInEther));
    alert("You can only calculate a flowRate based on a number");
    return;
  } else if (typeof Number(amountInEther) === "number") {
    const monthlyAmount = ethers.utils.parseEther(amountInEther.toString());
    const calculatedFlowRate = Math.floor(monthlyAmount / 3600 / 24 / 30);
    return calculatedFlowRate;
  }
}

export const startFlow = async ({ userSigner, recipient, amount }) => {
  try {
    const provider = userSigner?.provider;
    console.log({ provider, recipient, amount });
    const sf = await sfInstance(provider);
    const walletAddress = await window.ethereum.request({
      method: "eth_requestAccounts",
      params: [
        {
          eth_accounts: {},
        },
      ],
    });

    const payer = sf.user({
      address: walletAddress[0],
      token: "0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f", // fDAIx contract
    });

    const rate = calculateFlowRate(amount);
    await payer.flow({
      recipient: recipient,
      flowRate: rate,
    });

    const superflow = await payer.details();
    console.log({ superflow });
  } catch (error) {
    console.log({ error });
  }
};
