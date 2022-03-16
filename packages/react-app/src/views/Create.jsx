import React, { useState } from "react";
import { ByTemplate } from "../components/Create/index";
import EmploymentAgreement from "../templates/employment-agreement.md";
import CustomAgreement from "../templates/custom-agreement.md";
import IndependentContractor from "../templates/independent-contractor-agreement.md";
import MediationAgreement from "../templates/mediation-agreement.md";
import { Radio } from "antd";

const agreements = {
  "Employment Agreement": EmploymentAgreement,
  "Independent Contractor Agreement": IndependentContractor,
  "Mediation Agreement": MediationAgreement,
  "Custom Agreement": CustomAgreement,
};

function Create(props) {
  const { writeContracts } = props;
  const [url, setUrl] = useState(EmploymentAgreement);
  const { UnbreakableVowFactory } = writeContracts;
  const onRadioChange = e => {
    setUrl(e.target.value);
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
        <Radio.Group onChange={onRadioChange} value={url}>
          {Object.entries(agreements).map(([title, url]) => (
            <Radio value={url}>{title}</Radio>
          ))}
        </Radio.Group>
      </div>
      <ByTemplate agreement={url} contract={UnbreakableVowFactory} {...props} />
    </div>
  );
}

export default Create;
