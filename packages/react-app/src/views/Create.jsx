import React, { useState } from "react";
import { ByTemplate } from "../components/Create/index";
import EmploymentAgreement from "../templates/employment-agreement";
import CustomAgreement from "../templates/custom-agreement";
import { Radio } from "antd";

const modes = ["custom", "employment"];

function Create({ writeContracts, readContracts }) {
  const [mode, setMode] = useState("employment");
  const { UnbreakableVowFactory } = writeContracts;
  const onRadioChange = e => {
    setMode(e.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        marginTop: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div style={{ marginLeft: 20 }}>
        <Radio.Group onChange={onRadioChange} value={mode}>
          <Radio value={modes[1]}>Employment Agreement</Radio>
          <Radio value={modes[0]}>Custom Agreement</Radio>
        </Radio.Group>
      </div>

      {
        //Example of React showing markdown
      }
      {/* <ReactMarkdown style={{ margin: 32 }}>{templateReady}</ReactMarkdown> */}

      {mode === "custom" ? (
        <ByTemplate agreement={CustomAgreement} contract={UnbreakableVowFactory} readContracts={readContracts} />
      ) : (
        <ByTemplate agreement={EmploymentAgreement} contract={UnbreakableVowFactory} readContracts={readContracts} />
      )}
    </div>
  );
}

export default Create;
