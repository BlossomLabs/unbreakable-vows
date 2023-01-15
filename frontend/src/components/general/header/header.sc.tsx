import styled from "styled-components";
import { zIndex, mediaQueries } from "@/constants/general";
import { Flex } from "@/components/styled-components/flex";
import { Button as CButton } from "@/components/styled-components/button";

interface IHeader {
  show?: boolean;
}

export const StyledHeader = styled(Flex)<IHeader>`
  left: 0;
  right: 0;
  top: ${(props) => (props.show ? 0 : "-100px")};
  padding: 2rem;
  z-index: ${zIndex.HEADER};
  transition: top 0.3s ease;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0;
  img {
    object-fit: contain;
  }
`;

export const HeaderButton = styled(CButton)`
  display: flex;
  height: 50px;
  font-weight: normal;
  font-size: 16px;
  line-height: 22px;
  padding: 12px;
  border-radius: 48px;
  text-align: left;
  color: blue;
  border: 1px solid white;
  box-shadow: black;
`;

export const BalanceButton = styled(HeaderButton)`
  position: relative;
`;

export const WalletButton = styled(HeaderButton)`
  div:nth-child(2) {
    display: none;
  }
  div:nth-child(1) {
    width: 100%;
  }
  ${mediaQueries.tablet} {
    font-size: 14px;
    width: 200px;
    padding: 6px 16px;
    div:nth-child(1) {
      width: 100%;
    }
    div:nth-child(2) {
      display: flex;
    }
  }
`;

export const HBContainer = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
`;

export const WBInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`;

export const WBNetwork = styled.a`
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 13px;
  color: #b9a7ff;
  width: 123px;
`;

export const HBPic = styled.img`
  border-radius: 24px;
`;

export const HBContent = styled.a`
  margin-left: 8px;
  display: none;
  ${mediaQueries.tablet} {
    display: flex;
  }
`;

export const Title = styled.h1`
  font-family: "IBM Plex Mono", monospace;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.02em;
  text-align: left;
  color: ${(props) => props.theme.fg};
`;

interface IHeaderLinkProps {
  active?: boolean;
}

export const HeaderLinks = styled(Flex)`
  background-color: white;
  border: 1px solid white;
  border-radius: 48px;
  padding: 6px;
  gap: 8px;
  display: none;
  box-shadow: black;
  ${mediaQueries.laptopL} {
    display: flex;
  }
`;

export const HeaderLink = styled.span<IHeaderLinkProps>`
  padding: 8px 16px 7px;
  border-radius: 72px;
  &:hover {
    border-bottom: 1px solid black;
  }
`;

export const ConnectButton = styled.button`
  box-shadow: black;
`;

export const SmallCreateProject = styled.a`
  width: 48px;
  height: 48px;
  box-shadow: black;
  span {
    font-weight: 500;
    font-size: 20px;
  }
`;

export const LargeCreateProject = styled.div`
  display: none;
  ${mediaQueries.laptopS} {
    display: unset;
  }
`;

export const SmallCreateProjectParent = styled.div`
  display: none;
  ${mediaQueries.mobileL} {
    display: unset;
  }
  ${mediaQueries.laptopS} {
    display: none;
  }
`;

export const MenuAndButtonContainer = styled.div`
  position: relative;
  z-index: 2;
`;

export const CoverLine = styled.div`
  position: absolute;
  z-index: 1;
  left: 1px;
  right: 1px;
  top: 1px;
  bottom: 4px;
  border-radius: 48px;
`;

export const MainLogoBtn = styled.div`
  display: flex;
`;
