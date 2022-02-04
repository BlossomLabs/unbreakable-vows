import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/BlossomLabs/unbreakable-vows/" target="_blank" rel="noopener noreferrer">
      <PageHeader title="🤝" subTitle="unbreakable vows" style={{ cursor: "pointer" }} />
    </a>
  );
}
