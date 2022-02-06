import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { ethers } from "ethers";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import deployedContracts from "../contracts/hardhat_contracts.json";
import { Button } from "antd";

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
      console.log({ stngs });
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
  console.log({ vow });
  useEffect(() => {
    getVow();
  }, [readContracts, chainId, vowHash]);
  if (!vow) return null;
  return (
    <div style={{ alignItems: "center", margin: "auto" }}>
      <div
        style={{
          width: "600px",
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        {vow?.state !== 2 && (
          <Button danger={vow?.state === 1} type="primary" size="small" style={{ width: "100px" }}>
            {vow?.state === 0 ? "SIGN" : vow?.state === 1 && "Terminate"}
          </Button>
        )}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "600px",
            alignItems: "center",
            textAlign: "center",
            margin: "auto",
            padding: "30px",
            minHeight: "550px",
            border: "0.5px solid black",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <h1 style={{ borderRight: "1px solid black", paddingRight: 20, marginRight: 20 }}>
              {vow?.title || "Untitled Vow"}
            </h1>
            <h2>{formatState(vow?.state)}</h2>
          </div>
          <div style={{ height: "450px", overflow: "scroll" }}>
            <div style={{ marginBottom: 32 }}>
              <h2 style={{ marginTop: 10, fontWeight: "bold" }}>Parties</h2>
              <div>
                {vow?.parties?.map(i => {
                  return <p>{i}</p>;
                })}
              </div>
            </div>
            <ReactMarkdown>{vow?.markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VowViewer;
