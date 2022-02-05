import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
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

function VowViewer({ readContracts, provider, chainId }) {
  const [vow, setVow] = useState(null);
  const { vowHash } = useParams();

  const getVow = async () => {
    try {
      if (_.isEmpty(readContracts) || !chainId || !vowHash) return null;
      const dContracts = deployedContracts[chainId];
      const ABI = dContracts[Object.keys(dContracts)[0]].contracts.UnbreakableVow.abi;
      const instance = new ethers.Contract(vowHash, ABI, provider);
      const stngs = await instance.getCurrentSetting();
      const [parties] = await instance.getParties();
      const state = await instance.state();
      const ipfs = ethers.utils.toUtf8String(stngs.content);
      const docURL = `https://gateway.pinata.cloud/ipfs/${
        ipfs.split(":")[1] || "QmXDAc25vFHdxCkhqaXECGp1WVXYZgnQGTjU8o9Sn4HaaX"
      }`;
      const mdRes = await axios.get(docURL);
      setVow({
        parties,
        state,
        hash: vowHash,
        arbitrator: formatAddress(stngs.arbitrator),
        content: docURL,
        title: stngs.title,
        markdown: mdRes?.data,
      });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getVow();
  }, [readContracts, chainId, vowHash]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", margin: "20px", alignItems: "center", textAlign: "center" }}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <h2 style={{ borderRight: "1px solid black", paddingRight: 20, marginRight: 20 }}>
          {vow?.title || "Untitled Vow"}
        </h2>
        <h4>{formatState(vow?.state)}</h4>
      </div>
      <div>
        <h4>Parties</h4>
        <div>
          {vow?.parties?.map(i => {
            return <p>{i}</p>;
          })}
        </div>
      </div>
      <ReactMarkdown style={{ margin: 32 }}>{vow?.markdown}</ReactMarkdown>
    </div>
  );
}

export default VowViewer;
