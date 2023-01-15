import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ThemeProvider } from "styled-components";
import { Crimson_Pro } from "@next/font/google";
import { defaultTheme } from "../styles/theme";
import Header from "@/components/general/header/header";

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  AuthenticationStatus,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, gnosis, goerli, localhost } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { SiweMessage } from "siwe";
import { useEffect, useMemo, useRef, useState } from "react";

import type { AppProps } from "next/app";

const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "";

const CrimsonPro = Crimson_Pro({ weight: "400", subsets: ["latin"] });

const theme = {
  colors: defaultTheme.colors,
};

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    gnosis,
    polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [goerli, localhost]
      : []),
  ],
  [alchemyProvider({ apiKey: ALCHEMY_API_KEY }), publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: "Unbreakable Vows",
  chains,
});

const demoAppInfo = {
  appName: "Unbreakable Vows",
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
  const fetchingStatusRef = useRef(false);
  const verifyingRef = useRef(false);
  const [authStatus, setAuthStatus] = useState<AuthenticationStatus>("loading");

  // Fetch user when:
  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current || verifyingRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const response = await fetch("/api/user");
        const json = await response.json();
        setAuthStatus(json.address ? "authenticated" : "unauthenticated");
      } catch (_error) {
        setAuthStatus("unauthenticated");
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    // 1. page loads
    fetchStatus();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", fetchStatus);
    return () => window.removeEventListener("focus", fetchStatus);
  }, []);

  const authAdapter = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch("/api/nonce");
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return new SiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to UV.",
          uri: window.location.origin,
          version: "1",
          chainId,
          nonce,
        });
      },

      getMessageBody: ({ message }) => {
        return message.prepareMessage();
      },

      verify: async ({ message, signature }) => {
        verifyingRef.current = true;

        try {
          const response = await fetch("/api/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message, signature }),
          });

          const authenticated = Boolean(response.ok);

          if (authenticated) {
            setAuthStatus(authenticated ? "authenticated" : "unauthenticated");
          }

          return authenticated;
        } catch (error) {
          return false;
        } finally {
          verifyingRef.current = false;
        }
      },

      signOut: async () => {
        setAuthStatus("unauthenticated");
        await fetch("/api/logout");
      },
    });
  }, []);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitAuthenticationProvider
        adapter={authAdapter}
        status={authStatus}
      >
        <RainbowKitProvider appInfo={demoAppInfo} chains={chains}>
          <main className={CrimsonPro.className}>
            <ThemeProvider theme={theme}>
              <Header />
              <Component {...pageProps} />
            </ThemeProvider>
          </main>
        </RainbowKitProvider>
      </RainbowKitAuthenticationProvider>
    </WagmiConfig>
  );
}
