import { PageHeader, Menu } from "antd";

import { Link, useLocation } from "react-router-dom";
import React from "react";

// displays a page header

export default function Header() {
  const location = useLocation();
  return (
    <a href="" target="_blank" rel="noopener noreferrer">
      <PageHeader
        title="🪄 Unbreakable Vows ✨"
        subTitle={
          <Menu selectedKeys={[location.pathname]} mode="horizontal">
            {/* <Menu.Item key="/">
              <Link to="/">App Home</Link>
            </Menu.Item> */}
            {/* <Menu.Item key="/debug">
              <Link to="/debug">Debug Contracts</Link>
            </Menu.Item>
            <Menu.Item key="/exampleui">
              <Link to="/exampleui">ExampleUI</Link>
            </Menu.Item> */}
            {/* <Menu.Item key="/hints">
              <Link to="/hints">Hints</Link>
            </Menu.Item>
            <Menu.Item key="/mainnetdai">
              <Link to="/mainnetdai">Mainnet DAI</Link>
            </Menu.Item>
            <Menu.Item key="/subgraph">
              <Link to="/subgraph">Subgraph</Link>
            </Menu.Item> */}
            <Menu.Item key="/create">
              <Link to="/create">Create Vow</Link>
            </Menu.Item>
            <Menu.Item key="/vows">
              <Link to="/vows">My Vows</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={{ pathname: "https://github.com/BlossomLabs/unbreakable-vows/" }} target="_blank">
                Source Code
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to={{ pathname: "https://showcase.ethglobal.com/roadtoweb3/unbreakable-vows" }} target="_blank">
                ETHGlobal Road to Web3
              </Link>
            </Menu.Item>
          </Menu>
        }
        style={{ cursor: "pointer" }}
      />
    </a>
  );
}
