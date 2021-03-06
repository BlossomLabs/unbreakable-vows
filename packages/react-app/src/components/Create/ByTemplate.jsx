import React, { useState, useEffect } from "react";
import { utils } from "ethers";
import { useHistory } from "react-router-dom";
import { Steps, Button, message } from "antd";
import ReactMarkdown from "react-markdown";
import Handlebars from "handlebars";
import { parseTemplate, prepareQuesions, createMDFile, pinFileToIPFS } from "../../templates/utils";
import "./styles.css";
import _ from "underscore";
import SectionParser from "./SectionParser";
import moment from "moment";
import LoadingScreen from "../loading";

const { Step } = Steps;

Handlebars.registerHelper("eq", function (arg1, arg2, options) {
  return arg1 === arg2 || (arg1 === null && arg2 === 1) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("display", function (...args) {
  return args.slice(0, -1).reduce((a, v) => a || v) || " __________ ";
});

Handlebars.registerHelper("option", function (...args) {
  return args[0] ? args.slice(1, -1)[args[0] - 1] : " __________ ";
});

Handlebars.registerHelper("date", function (date) {
  return date ? moment(date).format("LL") : " __________ ";
});

const ByTemplate = props => {
  const { agreement, contract } = props;
  const history = useHistory();
  const [variables, setVariables] = useState(null);
  const [sections, setSections] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [mdText, setMdText] = useState("null");
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

  const createAndSign = async () => {
    const { blob } = createMDFile(templateReady);
    const ipfsHash = await pinFileToIPFS(`${variables?.uVowTitle}.md`, blob);
    const bytes = utils.toUtf8Bytes(ipfsHash);
    const hex = utils.hexlify(bytes);
    // Validate main inputs
    if (!hex || !variables?.uVowTitle || !variables?.uVowsCollateral) return message.error("Complete all fields");
    const { uVowTitle, uVowsCollateral } = variables;
    const tx = await contract.createUnbreakableVow(
      // readContracts.Arbitrator.address,
      uVowsCollateral?.tokens[0],
      uVowTitle,
      hex,
      uVowsCollateral?.parties,
      uVowsCollateral?.tokens,
      uVowsCollateral?.amounts,
    );
    setIsLoading(true);
    const txDone = await tx.wait();

    console.log({ hex, txDone, tx });

    message.success("Processing complete!");

    const event = txDone?.events?.find(i => i?.event === "NewUnbreakableVow");
    const vowHash = event?.args?.vow;
    setIsLoading(false);
    history.push(`/vow/${vowHash}`);
  };

  useEffect(() => {
    fetch(agreement)
      .then(response => response.text())
      .then(text => {
        const agreement = parseTemplate(text);
        const preparedQs = prepareQuesions(agreement);
        setVariables(preparedQs.variables);
        setSections(preparedQs.sections);
        setMdText(agreement.template.replace(/\{\{\*\*/g, "{{display ").replace(/\*\*}}/g, "}}"));
      });
  }, [agreement]);

  if (!variables || !sections || sections.length === 0) return null;
  return (
    <div className="bytemplate-container">
      <LoadingScreen state={isLoading} tip={"Wait for the transaction "} />
      <div className="left-bytemplate">
        <Steps current={current} direction="vertical" className="left-steps" onChange={c => setCurrent(c)}>
          {_.map(sections, item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">
          {<SectionParser setInputs={setInputs} section={sections[current]} variables={variables} {...props} />}
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
