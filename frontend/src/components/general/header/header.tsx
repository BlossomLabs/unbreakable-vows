import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { animated, useSpring } from "@react-spring/web";
import {
  StyledHeader,
  MainLogoBtn,
  Logo,
  HeaderLinks,
  HeaderLink,
} from "./header.sc";
import { headerRoutes } from "./headerRoutes";
import HeaderRoutesResponsive from "./headerRoutesResponsive";
import { Flex } from "@/components/styled-components/flex";

const Header = () => {
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);

  const animatedProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 100,
  });

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      const show = scrollY <= lastScrollY;
      setShowHeader(show);
      // if (!show) {
      //   setShowRewardMenu(false);
      //   setShowUserMenu(false);
      // }
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [showHeader]);

  return (
    <StyledHeader
      justifyContent="space-between"
      alignItems="center"
      show={showHeader}
    >
      <Flex>
        <>
          <LoadingDiv style={animatedProps}>
            <MainLogoBtn>
              <Link href={"/"} passHref>
                <Logo>
                  <Image
                    width={210}
                    height={80}
                    alt="Asimmetry logo"
                    src={`/images/logo.png`}
                    priority
                  />
                </Logo>
              </Link>
            </MainLogoBtn>
          </LoadingDiv>
          {/* <HeaderRoutesResponsive /> */}
        </>
      </Flex>
      <HeaderLinks>
        {/* {headerRoutes.map((link, index) => (
          <Link href={link.href} passHref key={index}>
            <HeaderLink active={link.href.includes(router.route)}>
              {link.title}
            </HeaderLink>
          </Link>
        ))} */}
        <ConnectButton />
      </HeaderLinks>
    </StyledHeader>
  );
};

const LoadingDiv = styled(animated.div)``;

export default Header;
