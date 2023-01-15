import React from "react";
import styled from "styled-components";
import Link from "next/link";

interface IHeaderRouteItem {
  href: string;
  title?: string;
}

const HeaderRoutesItem = ({ href, title }: IHeaderRouteItem) => (
  <Link href={href} passHref>
    <RoutesItem href={href}>{title}</RoutesItem>
  </Link>
);

const RoutesItem = styled.a`
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  border-radius: 72px;
  color: inherit;

  :hover {
    color: light-blue !important;
  }
`;

export default HeaderRoutesItem;
