import { useEffect, useState } from "react";
import { providers } from "ethers";
import {
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
  useNetwork,
  Address,
} from "wagmi";

import { YourContract as CONTRACT_ADDRESS } from "../artifacts/contracts/contractAddress";
import YourContract from "../artifacts/contracts/YourContract.sol/YourContract.json";

const localProvider = new providers.StaticJsonRpcProvider(
  "http://localhost:8545"
);

const useContract = () => {
  const [isLocalChain, setIsLocalChain] = useState(false);

  const { chain } = useNetwork();

  const yourContract = {
    address: CONTRACT_ADDRESS as Address,
    abi: YourContract.abi,
  };
  // write example
  //   const { config: setGreetingConfig } = usePrepareContractWrite({
  //     ...yourContract,
  //     functionName: "setGreeting",
  //   });

  //   const setGreeting = useContractWrite(setGreetingConfig);

  const yourContractRead = useContractReads({
    contracts: [
      {
        ...yourContract,
        functionName: "greeting",
      },
    ],
  });

  useEffect(() => {
    if (chain && chain.id === 1337) {
      setIsLocalChain(true);
    }
  }, [chain]);

  return {
    yourContract: {
      data: yourContract,
      read: yourContractRead,
    },
    isLocalChain,
  };
};

export default useContract;
