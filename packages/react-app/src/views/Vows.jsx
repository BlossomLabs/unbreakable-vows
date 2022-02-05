import React, { useEffect } from "react";
import _ from "lodash";

function Vows({ readContracts, provider }) {
  const showEvents = async () => {
    if (_.isEmpty(readContracts)) return null;
    const contract = readContracts.UnbreakableVowFactory;
    const filter = contract.filters.NewUnbreakableVow(null, "0x00d18ca9782bE1CaEF611017c2Fbc1a39779A57C");
    console.log({ contractt: contract, filter });
    const fromBlock = await provider.getBlockNumber().then(b => b - 10000);
    const toBlock = "latest";

    contract.queryFilter(filter, fromBlock, toBlock).then(logs => {
      console.log({ logs });
    });
  };
  console.log({ readContracts });
  useEffect(() => {
    showEvents();
  }, [readContracts]);

  return <div></div>;
}

export default Vows;
