import React from "react";
import { Spin } from "antd";

const Loading = ({ state, tip }) => {
  if (state) {
    return (
      <div
        style={{
          display: "flex",
          position: "fixed",
          zIndex: "999",
          height: "100vh",
          width: "100vw",
          overflow: "show",
          margin: "auto",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backdropFilter: "blur(8px)",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip={tip || "Loading..."} />
      </div>
    );
  } else {
    return null;
  }
};

export default Loading;
