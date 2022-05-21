import React, { useState } from "react";
import { ByTemplate } from "../components/Create/index";
import EmploymentAgreement from "../templates/employment-agreement.md";
import CustomAgreement from "../templates/custom-agreement.md";
import IndependentContractor from "../templates/independent-contractor-agreement.md";
import MediationAgreement from "../templates/mediation-agreement.md";
import { Radio } from "antd";

const agreements = [
  { url: EmploymentAgreement, title: "Employment Agreement" },
  { url: IndependentContractor, title: "Independent Contractor Agreement" },
  { url: MediationAgreement, title: "Mediation Agreement" },
  { url: CustomAgreement, title: "Custom Agreement" },
];

function Create(props) {
  const { writeContracts } = props;
  const [agreement, setAgreement] = useState(agreements[0]);
  const { UnbreakableVowFactory } = writeContracts;
  const onRadioChange = e => {
    setAgreement(e.target.value);
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
        <Radio.Group onChange={onRadioChange} value={agreement}>
          {agreements.map(val => (
            <Radio value={val}>{val?.title}</Radio>
          ))}
        </Radio.Group>
      </div>
      <ByTemplate agreement={agreement} contract={UnbreakableVowFactory} {...props} />
    </div>
  );
}

export default Create;
