import React, { useState, useEffect } from "react";
import { ethers, utils } from "ethers";
import { Steps, Button, message } from "antd";
import ReactMarkdown from "react-markdown";
import Handlebars from "handlebars";
import { prepareQuesions, createMDFile, pinFileToIPFS } from "../../templates/utils";
import "./styles.css";
import _ from "underscore";
import SectionParser from "./SectionParser";

const { Step } = Steps;

Handlebars.registerHelper("eq", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("xx", function (value) {
  return value || "__________";
});

const ByTemplate = ({ agreement, contract, readContracts }) => {
  const [variables, setVariables] = useState(null);
  const [sections, setSections] = useState(null);
  const [current, setCurrent] = useState(0);
  const [mdText, setMdText] = useState("null");
  const questions = agreement.questions;
  const template = Handlebars.compile(mdText);
  const templateReady = template(variables);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const setInputs = (key, value) => {
    setVariables({ ...variables, [key]: value });
  };

  const getTemplateReady = () => {
    fetch(agreement.template)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setMdText(text);
      });
  };
  console.log({ variables });
  const createAndSign = async () => {
    const { url, blob } = createMDFile(templateReady);
    const ipfsHash = await pinFileToIPFS("u_vow.md", blob);
    const bytes = utils.toUtf8Bytes(ipfsHash);
    const hex = utils.hexlify(bytes);
    // Validate main inputs
    // if(!variables?.uVowTitle || !variables?.uVowsParties )
    const { uVowsParties, uVowTitle, uVowsCollateral } = variables;
    console.log({ contract, hex, readContracts, arb: readContracts.Arbitrator.address });
    const tx = await contract.createUnbreakableVow(
      readContracts.Arbitrator.address,
      uVowTitle,
      hex,
      uVowsParties,
      uVowsParties.map(party => uVowsCollateral.tokenAddress),
      uVowsParties.map(party => ethers.utils.parseUnits(uVowsCollateral?.amount?.toString(), 18)),
    );

    const txDone = await tx.wait();

    console.log({ hex, txDone, tx });

    message.success("Processing complete!");
  };

  useEffect(() => {
    // Set variables
    const preparedQs = prepareQuesions(questions);
    setVariables(preparedQs.variables);
    setSections(preparedQs.sections);

    // Get template ready
    getTemplateReady();
  }, [agreement]);

  if (!variables && !sections) return null;

  return (
    <div className="bytemplate-container">
      <div className="left-bytemplate">
        <Steps current={current} direction="vertical" className="left-steps" onChange={c => setCurrent(c)}>
          {_.map(sections, item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {<SectionParser setInputs={setInputs} section={sections[current]} variables={variables} />}
          <div className="steps-action">
            {current < sections.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === sections.length - 1 && (
              <Button type="primary" onClick={createAndSign}>
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="right-bytemplate">
        <ReactMarkdown style={{ margin: 32 }}>{templateReady}</ReactMarkdown>
      </div>
    </div>
  );
};

export default ByTemplate;
