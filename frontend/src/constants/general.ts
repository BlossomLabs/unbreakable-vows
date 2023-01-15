export const chainName = (chainId: number) => {
  switch (chainId) {
    case 31337:
      return "Hardhat";
    case 1:
      return "Mainnet";
    case 42:
      return "Kovan";
    case 5:
      return "Goerli";
    case 4:
      return "Rinkeby";
    case 100:
      return "Gnosis Chain";
    default:
      return "Unknown";
  }
};

export const deviceSize = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptopS: 1024,
  laptopL: 1280,
  desktop: 1440,
};

export const device = {
  mobileS: `(min-width: ${deviceSize.mobileS}px)`,
  mobileM: `(min-width: ${deviceSize.mobileM}px)`,
  mobileL: `(min-width: ${deviceSize.mobileL}px)`,
  tablet: `(min-width: ${deviceSize.tablet}px)`,
  laptopS: `(min-width: ${deviceSize.laptopS}px)`,
  laptopL: `(min-width: ${deviceSize.laptopL}px)`,
  desktop: `(min-width: ${deviceSize.desktop}px)`,
  desktopL: `(min-width: ${deviceSize.desktop}px)`,
};

export const mediaQueries = {
  mobileS: `@media (min-width: ${deviceSize.mobileS}px)`,
  mobileM: `@media (min-width: ${deviceSize.mobileM}px)`,
  mobileL: `@media (min-width: ${deviceSize.mobileL}px)`,
  tablet: `@media (min-width: ${deviceSize.tablet}px)`,
  laptopS: `@media (min-width: ${deviceSize.laptopS}px)`,
  laptopL: `@media (min-width: ${deviceSize.laptopL}px)`,
  desktop: `@media (min-width: ${deviceSize.desktop}px)`,
};

export const zIndex = {
  HEADER: 100,
  DROPDOWN: 1000,
  STICKY: 1020,
  FIXED: 1030,
  MODALBACKDROP: 1040,
  OFFCANVAS: 1050,
  MODAL: 1060,
  POPOVER: 1070,
  TOOLTIP: 1080,
  NAVBAR: 1100,
};

export const statusCodes = [
  "401",
  "403",
  "404",
  "500",
  "502",
  "503",
  "504",
] as const;
