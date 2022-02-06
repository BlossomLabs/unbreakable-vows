import React, { useState, useEffect } from "react";
import _ from "lodash";
import axios from "axios";
import { ethers, utils } from "ethers";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import deployedContracts from "../contracts/hardhat_contracts.json";
import { Button } from "antd";
import { formatAddress, formatState } from "../templates/utils";

const erc20Abi = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address _spender, uint256 _value) public returns (bool success)",
  "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",
];

function VowViewer({ readContracts, userSigner, chainId, address }) {
  const [vow, setVow] = useState(null);
  const [contract, setContract] = useState(null);
  const [userCollateral, setUserCollateral] = useState(null);
  const { vowHash } = useParams();

  const getVow = async () => {
    try {
      if (_.isEmpty(readContracts) || !chainId || !vowHash) return null;
      const dContracts = deployedContracts[chainId];
      const ABI = dContracts[Object.keys(dContracts)[0]].contracts.UnbreakableVow.abi;
      const instance = new ethers.Contract(vowHash, ABI, userSigner);
      const stngs = await instance.getCurrentSetting();
      const [parties, signed, collateralTokens, collateralAmounts] = await instance.getParties();
      const state = await instance.state();
      const ipfs = ethers.utils.toUtf8String(stngs.content);
      const docURL = `https://gateway.pinata.cloud/ipfs/${ipfs.split(":")[1] || ""}`;
      const mdRes = await axios.get(docURL);
      setVow({
        parties,
        state,
        signed,
        collateralTokens,
        collateralAmounts,
        hash: vowHash,
        arbitrator: formatAddress(stngs.arbitrator),
        content: docURL,
        title: stngs.title,
        markdown: mdRes?.data,
      });
      setContract(instance);
      setUserCollateral({
        token: collateralTokens[_.invert(parties)[address]],
        amount: collateralAmounts[_.invert(parties)[address]],
      });
    } catch (error) {
      console.log({ error });
    }
  };

  const sign = async signed => {
    const collateral = new ethers.Contract(userCollateral?.token, erc20Abi, userSigner);
    await collateral.approve(address, userCollateral?.amount);
    if (!signed) {
      await contract.sign(1, { gasLimit: 10000000 });
    } else {
      await contract.unstakeCollateral({ gasLimit: 10000000 });
    }
    getVow();
  };

  const terminate = async offersTermination => {
    await contract.terminate(offersTermination, { gasLimit: 10000000 });
    getVow();
  };

  console.log({ vow });

  useEffect(() => {
    getVow();
  }, [readContracts, chainId, vowHash]);

  if (!vow) return null;

  const userSigned = vow?.signed[_.invert(vow?.parties)[address]] != 0;
  const userOffersTermination = vow?.signed[_.invert(vow?.parties)[address]] == 2;

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
        {vow?.state === 0 && (
          <Button
            danger={userSigned}
            type="primary"
            size="small"
            style={{ width: "100px" }}
            onClick={() => sign(userSigned)}
          >
            {!userSigned ? "SIGN" : "UNSIGN"}
          </Button>
        )}
        {vow?.state === 1 && (
          <Button
            danger={true}
            type="primary"
            size="small"
            style={{ minWidth: "100px" }}
            onClick={() => terminate(!userOffersTermination)}
          >
            {!userOffersTermination ? "OFFER TERMINATION" : "RETRACT TERMINATION OFFERING"}
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
