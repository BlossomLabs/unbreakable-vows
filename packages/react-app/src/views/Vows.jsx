import React, { useState, useEffect } from "react";
import { Table } from "antd";
import _ from "lodash";
import { ethers } from "ethers";
import deployedContracts from "../contracts/hardhat_contracts.json";
import { formatAddress, formatState } from "../templates/utils";

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (title, record) => <a href={`/#/vow/${record.hash}`}>{title || "Untitled Vow"}</a>,
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
    render: parties => (
      <div style={{ display: "flex", flexDirection: "column" }}>
        {parties.map(p => {
          return <p>{p}</p>;
        })}
      </div>
    ),
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
  const [vows, setVows] = useState(null);

  const getVows = async logs => {
    const dContracts = deployedContracts[chainId];
    const ABI = dContracts[Object.keys(dContracts)[0]].contracts.UnbreakableVow.abi;

    const vowsHashes = [];
    /// Get Hashs
    logs?.map(i => {
      vowsHashes.push(i?.args["vow"]);
    });
    // Get instances
    const vows = await vowsHashes.map(async (i, k) => {
      const instance = new ethers.Contract(i, ABI, provider);
      const stngs = await instance.getCurrentSetting();
      const [parties, signed, collateralTokens, collateralAmounts] = await instance.getParties();
      const state = await instance.state();
      const ipfs = ethers.utils.toUtf8String(stngs.content);
      return {
        parties: [...parties],
        signed,
        collateralTokens,
        collateralAmounts: collateralAmounts.map(amount => ethers.utils.formatUnits(amount, 18)),
        // depositedAmounts: depositedAmounts.map(amount => ethers.utils.formatUnits(amount, 18)),
        state,
        hash: i,
        arbitrator: formatAddress(stngs.arbitrator),
        content: `https://gateway.pinata.cloud/ipfs/${ipfs.split(":")[1] || ""}`,
        title: stngs.title,
      };
    });
    Promise.all(vows).then(results => {
      console.log({ results });
      setVows(results);
    });
  };

  const getEvents = async () => {
    if (_.isEmpty(readContracts) || !chainId) return null;
    const contract = readContracts.UnbreakableVowFactory;
    const filter = contract.filters.NewUnbreakableVow(null, address);
    const fromBlock = await provider.getBlockNumber().then(b => b - 10000);
    const toBlock = "latest";
    console.log({ contract });
    contract.queryFilter(filter, fromBlock, toBlock).then(logs => {
      getVows(logs);
    });
  };

  useEffect(() => {
    getEvents();
  }, [chainId, provider, address]);

  const dataSource = vows && Object.values(vows);

  return <div style={{ margin: "20px" }}>{dataSource && <Table dataSource={dataSource} columns={columns} />}</div>;
}

export default Vows;
