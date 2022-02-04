import React from "react";
import { Input, DatePicker, InputNumber, Radio } from "antd";
import _ from "underscore";
import "./styles.css";

function SectionParser(props) {
  const { section, variables, setInputs } = props;

  const validateCondition = condition => {
    const a = condition?.split("==")[0];
    const b = condition?.split("==")[1];
    const validation = section[a].type[b - 1];
    return b ? variables[a] == validation : !!variables[a];
  };

  const renderInput = (key, type, extra) => {
    switch (type) {
      case "text":
      case "address":
        return <Input placeholder={key} value={variables[key]} onChange={i => setInputs(key, i.target.value)} />;
      case "longtext":
        return <Input.TextArea rows={4} value={variables[key]} onChange={i => setInputs(key, i.target.value)} />;
      case "number":
        return <InputNumber defaultValue={variables[key]} onChange={i => setInputs(key, i)} />;
      case "multiple":
        return (
          <Radio.Group value={variables[key]}>
            {extra?.map((i, index) => {
              return (
                <Radio value={index + 1} onChange={() => setInputs(key, index + 1)}>
                  {i}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case "tokenList":
        return (
          <Radio.Group value={key}>
            {["xDAI", "HNY"]?.map(i => {
              return (
                <Radio value={i} onChange={() => setInputs(key, i)}>
                  {i}
                </Radio>
              );
            })}
          </Radio.Group>
        );
      case "date":
        return <DatePicker onChange={i => setInputs(key, i)} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h3>{section.title}</h3>
      {_.map(section, (sec, key) => {
        const fulfillsCondtion = sec?.condition ? validateCondition(sec.condition) : true;
        if (fulfillsCondtion) {
          return (
            <div className="section-input">
              <h4>{sec.text}</h4>
              {renderInput(key, _.isArray(sec.type) ? "multiple" : sec.type, sec.type)}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}

export default SectionParser;
