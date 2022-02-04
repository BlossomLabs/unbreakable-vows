import React, { useState } from "react";
import { useContractReader } from "eth-hooks";
import Handlebars from "handlebars";
import { Custom, ByTemplate } from "../components/Create/index";
import ReactMarkdown from "react-markdown";
import MDEditor from "@uiw/react-md-editor";
import { Radio } from "antd";

const modes = ["custom", "employment"];

function Create() {
  const [mode, setMode] = useState("employment");
  const template = Handlebars.compile(`This is an example of **markdown** in a *template*.  
  Hello {{ name }}!`);
  const templateReady = template({ name: "YOU" });

  const onRadioChange = e => {
    setMode(e.target.value);
  };

  return (
    <div style={{ width: "100%", marginTop: 20 }}>
      <Radio.Group onChange={onRadioChange} value={mode}>
        <Radio value={modes[1]}>Employment Agreement</Radio>
        <Radio value={modes[0]}>Custom Contract</Radio>
      </Radio.Group>

      {
        //Example of React showing markdown
      }
      {/* <ReactMarkdown style={{ margin: 32 }}>{templateReady}</ReactMarkdown> */}

      {mode === "custom" ? <Custom /> : <ByTemplate />}
    </div>
  );
}

export default Create;
