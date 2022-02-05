import React, { useState, useEffect } from "react";
import _ from "lodash";
import { ethers } from "ethers";
import deployedContracts from "../contracts/hardhat_contracts.json";

function Vows({ readContracts, provider, address, chainId }) {
  const [events, setEvents] = useState(null);
  const [vows, setVows] = useState(null);

  const getVows = logs => {
    const dContracts = deployedContracts[chainId];
    const ABI = dContracts[Object.keys(dContracts)[0]].contracts.UnbreakableVow.abi;

    const vowsHashes = [];
    /// Get Hashs
    logs?.map(i => {
      vowsHashes.push(i?.args["vow"]);
    });

    // Get instances
    vowsHashes.map(async (i, k) => {
      const instance = new ethers.Contract(i, ABI, provider);
      console.log({ instance });
      const settings = await instance.getCurrentSetting();
      const parties = await instance.getParties();
      const state = await instance.state();
      console.log({ settings, parties, state });
      setVows({ ...vows, [i]: instance });
    });
  };

  const getEvents = async () => {
    if (_.isEmpty(readContracts) || !chainId) return null;
    const contract = readContracts.UnbreakableVowFactory;
    const filter = contract.filters.NewUnbreakableVow(null, address);
    const fromBlock = await provider.getBlockNumber().then(b => b - 10000);
    const toBlock = "latest";

    contract.queryFilter(filter, fromBlock, toBlock).then(logs => {
      setEvents(logs);
      getVows(logs);
    });
  };

  useEffect(() => {
    getEvents();
  }, [readContracts, chainId]);

  console.log({ vows });

  return <div></div>;
}

export default Vows;
