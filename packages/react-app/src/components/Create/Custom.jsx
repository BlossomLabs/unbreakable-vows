import React, { useState } from "react";
import Handlebars from "handlebars";
import MDEditor from "@uiw/react-md-editor";

const modes = ["custom", "employment"];

function CreateCustom() {
  const [value, setValue] = useState("**Hello world!!!**");
  const template = Handlebars.compile(`This is an example of **markdown** in a *template*.  
  Hello {{ name }}!`);

  return (
    <div style={{ marginTop: "40px", padding: 20 }}>
      <MDEditor value={value} onChange={setValue} height={600} />
      {/* <MDEditor.Markdown source={value} /> */}
    </div>
  );
}

export default CreateCustom;
