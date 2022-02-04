import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Input, DatePicker, InputNumber, Radio, Button, Select } from "antd";
import _ from "underscore";
import "./styles.css";
import { useState } from "react";

const tokenOptions = ["DAI", "MATIC", "HNY"];

function EndlessArray({ onChange }) {
  const [val, setVal] = useState(null);
  const [arr, setArr] = useState([]);
  return (
    <div>
      {arr.map((i, k) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <p>{i}</p>
            <a
              onClick={() => {
                let arrCp = arr.slice();
                arrCp.splice(k, 1);
                setArr(arrCp);
                onChange(arrCp);
              }}
            >
              x
            </a>
          </div>
        );
      })}
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Input placeholder={"add addresss"} onChange={i => setVal(i.target.value)} />
        <Button
          onClick={() => {
            setArr([...arr, val]);
            onChange([...arr, val]);
          }}
        >
          +
        </Button>
      </div>
    </div>
  );
}

function TokenAmount({ onChange }) {
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [amount, setAmount] = useState(0);
  const Option = Select.Option;
  return (
    <div>
      <Select defaultValue={selectedToken} style={{ width: 120 }} onChange={i => setSelectedToken(i)}>
        {tokenOptions.map(i => {
          return <Option value={i}>{i}</Option>;
        })}
      </Select>
      <InputNumber
        onChange={a => {
          setAmount(a);
          onChange({
            symbol: selectedToken,
            amount: a,
          });
        }}
      />
    </div>
  );
}
function SectionParser(props) {
  const { section, variables, setInputs } = props;

  const validateCondition = condition => {
    const a = condition?.split("==")[0];
    const b = condition?.split("==")[1];
    const type = section[a].type;
    const validation = type.indexOf(type[b - 1]) + 1;
    return b ? variables[a] == validation : !!variables[a];
  };

  const renderInput = (key, type, extra) => {
    switch (type) {
      case "text":
      case "address":
        return <Input placeholder={key} value={variables[key]} onChange={i => setInputs(key, i.target.value)} />;
      case "longtext":
        return <MDEditor value={variables[key]} onChange={i => setInputs(key, i)} height={400} preview={"edit"} />;
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
      case "token":
        return (
          <Radio.Group value={key}>
            {tokenOptions?.map(i => {
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
      case "endlessArray":
        return <EndlessArray onChange={i => setInputs(key, i)} />;
      case "tokenAmount":
        return <TokenAmount onChange={i => setInputs(key, i)} />;
      default:
        return null;
    }
  };

  return (
    <div className="input-container">
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
    </div>
  );
}

export default SectionParser;
