import React, { useState, useEffect } from "react";
import { Table } from "antd";
import _ from "lodash";
import { ethers } from "ethers";
import deployedContracts from "../contracts/hardhat_contracts.json";

const formatAddress = str => {
  return str?.substr(0, 5) + "..." + str?.substr(-4);
};

const formatState = st => {
  switch (st) {
    case 0:
      return "Unsigned 📝";
    case 1:
      return "Active 💍";
    case 2:
      return "Terminated 🏁";
  }
};

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title, record) => <a href={`/vow/${record.hash}`}>{title || "Untitled Vow"}</a>,
  },
  {
    title: "State",
    dataIndex: "state",
    key: "state",
    render: st => formatState(st),
  },
  //   {
  //     title: "Document",
  //     dataIndex: "content",
  //     key: "content",
  //     render: link => <a href={link}>{link?.substr(0, 20) + "..." + link?.substr(-4)}</a>,
  //   },
  {
    title: "Parties",
    dataIndex: "parties",
    key: "parties",
  },
  //   {
  //     title: "Arbitrator",
  //     dataIndex: "arbitrator",
  //     key: "arbitrator",
  //   },
  //   {
  //     title: "Hash",
  //     dataIndex: "hash",
  //     key: "hash",
  //     render: hash => <a href={`/vow/${hash}`}>{formatAddress(hash)}</a>,
  //   },
];

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
      const stngs = await instance.getCurrentSetting();
      const [parties, collateralTokens, collateralAmounts, depositedAmounts] = await instance.getParties();
      const state = await instance.state();
      const ipfs = ethers.utils.toUtf8String(stngs.content);
      setVows({
        ...vows,
        [i]: {
          parties: [...parties],
          collateralTokens,
          collateralAmounts: collateralAmounts.map(amount => ethers.utils.formatUnits(amount, 18)),
          depositedAmounts: depositedAmounts.map(amount => ethers.utils.formatUnits(amount, 18)),
          state,
          hash: i,
          arbitrator: formatAddress(stngs.arbitrator),
          content: `https://gateway.pinata.cloud/ipfs/${ipfs.split(":")[1] || ""}`,
          title: stngs.title,
        },
      });
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

  const dataSource = vows && Object.values(vows);
  console.log({ vows, dataSource });

  return <div style={{ margin: "20px" }}>{dataSource && <Table dataSource={dataSource} columns={columns} />}</div>;
}

export default Vows;
