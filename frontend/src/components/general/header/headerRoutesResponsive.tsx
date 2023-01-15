import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { headerRoutes } from "./headerRoutes";
import { Shadow } from "@/components/styled-components/shadow";
import { mediaQueries } from "@/constants/general";
import HeaderRoutesItem from "./headerRouteItem";
import { FlexCenter } from "@/components/styled-components/flex";

const HeaderRoutesResponsive = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const activeIndex = headerRoutes.findIndex((i) => router.pathname === i.href);
  const activeMenu = headerRoutes[activeIndex]?.title;

  useEffect(() => {
    isOpen && setIsOpen(!isOpen);
  }, [router.pathname]);

  return (
    <>
      <DrawerClosed onClick={() => setIsOpen(true)}>
        {activeMenu && <p>{activeMenu}</p>}
      </DrawerClosed>
      {isOpen && (
        <Modal>
          <DrawerOpened>
            <HeaderItems>
              {headerRoutes.map((i) => (
                <HeaderRoutesItem key={i.title} href={i.href} title={i.title} />
              ))}
            </HeaderItems>
          </DrawerOpened>
          <CloseButton onClick={() => setIsOpen(false)}>
            <h3>X</h3>
          </CloseButton>
          <ModalSurrounding onClick={() => setIsOpen(false)} />
        </Modal>
      )}
    </>
  );
};

const ModalSurrounding = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: gray;
  opacity: 0.7;
  z-index: -1;
`;

const CloseButton = styled(FlexCenter)`
  top: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  right: 16px;
  cursor: pointer;
  margin-top: 12px;
  background: white;
`;

const Modal = styled.div`
  display: flex;
  gap: 8px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
`;

const DrawerClosed = styled(FlexCenter)`
  min-width: 100px;
  gap: 11px;
  border-radius: 72px;
  box-shadow: ${Shadow.Dark[500]};
  background: white;
  padding: 0 14px;
  height: 48px;
  cursor: pointer;
  color: nlue;
  display: flex;
  ${mediaQueries.laptopL} {
    display: none;
  }
`;

const DrawerOpened = styled.div`
  width: 209px;
  height: fit-content;
  display: flex;
  align-items: flex-start;
  gap: 11px;
  background: white;
  color: black;
  padding: 16px;
  margin-top: 12px;
  margin-left: 29px;
  border-radius: 18px;
  box-shadow: ${Shadow.Dark[500]};
`;

const HeaderItems = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
`;

export default HeaderRoutesResponsive;
