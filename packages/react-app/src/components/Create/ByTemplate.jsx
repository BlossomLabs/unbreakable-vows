import React, { useState, useEffect } from "react";
import { Steps, Button, message } from "antd";
import ReactMarkdown from "react-markdown";
import Handlebars from "handlebars";
import EmploymentAgreement from "../../templates/employment-agreement";
import { prepareQuesions } from "../../templates/utils";
import "./styles.css";
import _ from "underscore";
import SectionParser from "./SectionParser";

const { Step } = Steps;

Handlebars.registerHelper("eq", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("xx", function (value, options) {
  return value || "__________";
});

const ByTemplate = () => {
  const [variables, setVariables] = useState(null);
  const [sections, setSections] = useState(null);
  const [current, setCurrent] = useState(0);
  const [mdText, setMdText] = useState("null");
  const questions = EmploymentAgreement.questions;
  const template = Handlebars.compile(mdText);
  const templateReady = template(variables);
  console.log({ variables });
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
    fetch(EmploymentAgreement.template)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setMdText(text);
      });
  };

  useEffect(() => {
    // Set variables
    const preparedQs = prepareQuesions(questions);
    setVariables(preparedQs.variables);
    setSections(preparedQs.sections);

    // Get template ready
    getTemplateReady();
  }, []);

  console.log({ variables, sections, template });
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
          <div>{<SectionParser setInputs={setInputs} section={sections[current]} variables={variables} />}</div>
          <div className="steps-action">
            {current < sections.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === sections.length - 1 && (
              <Button type="primary" onClick={() => message.success("Processing complete!")}>
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
