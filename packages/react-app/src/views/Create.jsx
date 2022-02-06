import React, { useState } from "react";
import { ByTemplate } from "../components/Create/index";
import EmploymentAgreement from "../templates/employment-agreement";
import CustomAgreement from "../templates/custom-agreement";
import IndependentContractor from "../templates/independent-contractor-agreement";
import { Radio } from "antd";

const modes = ["custom", "employment", "independent-contractor"];

function Create(props) {
  const { writeContracts } = props;
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
          <Radio value={modes[2]}>Independent Contractor Agreement</Radio>
          <Radio value={modes[0]}>Custom Agreement</Radio>
        </Radio.Group>
      </div>

      {
        //Example of React showing markdown
      }
      {/* <ReactMarkdown style={{ margin: 32 }}>{templateReady}</ReactMarkdown> */}

      {mode === "custom" ? (
        <ByTemplate agreement={CustomAgreement} contract={UnbreakableVowFactory} {...props} />
      ) : mode === "independent-contractor" ? (
        <ByTemplate agreement={IndependentContractor} contract={UnbreakableVowFactory} {...props} />
      ) : (
        <ByTemplate agreement={EmploymentAgreement} contract={UnbreakableVowFactory} {...props} />
      )}
    </div>
  );
}

export default Create;
