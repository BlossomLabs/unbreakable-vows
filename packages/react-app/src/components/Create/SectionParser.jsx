import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { utils } from "ethers";
import { Input, DatePicker, InputNumber, Radio, Button, Select } from "antd";
import _ from "underscore";
import "./styles.css";
import { useState } from "react";

const tokenOptions = ["DAI", "MATIC", "HNY"];
const tokenOptionsContracts = {
  DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  MATIC: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  HNY: "0xb371248dd0f9e4061ccf8850e9223ca48aa7ca4b",
};

function EndlessArray({ onChange, onTokensChange }) {
  const [val, setVal] = useState(null);
  const [arr, setArr] = useState([]);
  const [tokensArr, setTokensArr] = useState([]);
  const [amountsArr, setAmountsArr] = useState([]);
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0]);
  const [amount, setAmount] = useState(0);
  const [currentToken, setCurrentToken] = useState(null);
  const Option = Select.Option;

  return (
    <div>
      {arr.map((i, k) => {
        return (
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <p>{i?.substr(0, 5) + "..." + i?.substr(-4)}</p>
            <p>{utils.formatUnits(amountsArr[k])}</p>
            <p>{_.invert(tokenOptionsContracts)[tokensArr[k]]}</p>
            <a
              onClick={() => {
                let arrCp = arr.slice();
                let tArrCp = tokensArr.slice();
                let aArrCp = amountsArr.slice();

                arrCp.splice(k, 1);
                tArrCp.splice(k, 1);
                aArrCp.splice(k, 1);

                setArr(arrCp);
                setTokensArr(tArrCp);
                setAmountsArr(aArrCp);
                onChange(arrCp);
                onTokensChange({ tokens: tArrCp, amounts: aArrCp });
              }}
            >
              x
            </a>
          </div>
        );
      })}
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "row", flex: 0.5 }}>
          <Input placeholder={"add addresss"} onChange={i => setVal(i.target.value)} />
        </div>
        <div style={{ flex: 0.5 }}>
          <InputNumber
            placeholder="amount"
            onChange={a => {
              setAmount(a);
              setCurrentToken(tokenOptionsContracts[selectedToken]);
            }}
          />
          <Select defaultValue={selectedToken} style={{ width: 120 }} onChange={i => setSelectedToken(i)}>
            {tokenOptions.map(i => {
              return <Option value={i}>{i}</Option>;
            })}
          </Select>
        </div>
        <Button
          onClick={async () => {
            const parsedAmount = utils.parseUnits(amount?.toString(), 18).toString();
            setArr([...arr, val]);
            setTokensArr([...tokensArr, tokenOptionsContracts[selectedToken]]);
            setAmountsArr([...amountsArr, parsedAmount]);
            await onTokensChange({
              parties: [...arr, val],
              tokens: [...tokensArr, tokenOptionsContracts[selectedToken]],
              amounts: [...amountsArr, parsedAmount],
            });
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
        placeholder="amount"
        onChange={a => {
          setAmount(a);
          onChange({
            symbol: selectedToken,
            amount: a,
            tokenAddress: tokenOptionsContracts[selectedToken],
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
          <Radio.Group value={variables[key]}>
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
        return <EndlessArray onChange={i => setInputs(key, i)} onTokensChange={i => setInputs("uVowsCollateral", i)} />;
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
