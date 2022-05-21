// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "DNXJA8RX2Q3VZ4URQIWP7Z68CJXQZSC6AW";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

export const ALCHEMY_KEY = "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF";

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "var(--primary-color)",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "var(--primary-color)",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan",
    color: "var(--primary-color)",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby",
    color: "var(--primary-color)",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten",
    color: "var(--primary-color)",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli",
    color: "var(--primary-color)",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "var(--primary-color)",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  polygon: {
    name: "polygon",
    color: "var(--primary-color)",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://polygon-rpc.com/",
    blockExplorer: "https://polygonscan.com/",
  },
  mumbai: {
    name: "mumbai",
    color: "var(--primary-color)",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    // rpcUrl: "https://rpc-mumbai.maticvigil.com",
    rpcUrl: "https://speedy-nodes-nyc.moralis.io/4f9ee5c6af0dc47aab19bd9f/polygon/mumbai",
    faucet: "https://faucet.polygon.technology/",
    blockExplorer: "https://mumbai.polygonscan.com/",
  },
  localArbitrum: {
    name: "localArbitrum",
    color: "var(--primary-color)",
    chainId: 153869338190755,
    blockExplorer: "",
    rpcUrl: `http://localhost:8547`,
  },
  localArbitrumL1: {
    name: "localArbitrumL1",
    color: "var(--primary-color)",
    chainId: 44010,
    blockExplorer: "",
    rpcUrl: `http://localhost:7545`,
  },
  rinkebyArbitrum: {
    name: "Arbitrum Testnet",
    color: "var(--primary-color)",
    chainId: 421611,
    blockExplorer: "https://rinkeby-explorer.arbitrum.io/#/",
    rpcUrl: `https://rinkeby.arbitrum.io/rpc`,
  },
  arbitrum: {
    name: "Arbitrum",
    color: "var(--primary-color)",
    chainId: 42161,
    blockExplorer: "https://explorer.arbitrum.io/#/",
    rpcUrl: `https://arb1.arbitrum.io/rpc`,
    gasPrice: 0,
  },
  localOptimismL1: {
    name: "localOptimismL1",
    color: "var(--primary-color)",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":9545",
  },
  localOptimism: {
    name: "localOptimism",
    color: "var(--primary-color)",
    chainId: 420,
    blockExplorer: "",
    rpcUrl: "http://" + (global.window ? window.location.hostname : "localhost") + ":8545",
    gasPrice: 0,
  },
  kovanOptimism: {
    name: "kovanOptimism",
    color: "#f01a37",
    chainId: 69,
    blockExplorer: "https://kovan-optimistic.etherscan.io/",
    rpcUrl: `https://kovan.optimism.io`,
    gasPrice: 0,
  },
  optimism: {
    name: "optimism",
    color: "var(--primary-color)",
    chainId: 10,
    blockExplorer: "https://optimistic.etherscan.io/",
    rpcUrl: `https://mainnet.optimism.io`,
  },
  localAvalanche: {
    name: "localAvalanche",
    color: "var(--primary-color)",
    chainId: 43112,
    blockExplorer: "",
    rpcUrl: `http://localhost:9650/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  fujiAvalanche: {
    name: "fujiAvalanche",
    color: "var(--primary-color)",
    chainId: 43113,
    blockExplorer: "https://cchain.explorer.avax-test.network/",
    rpcUrl: `https://api.avax-test.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  mainnetAvalanche: {
    name: "mainnetAvalanche",
    color: "var(--primary-color)",
    chainId: 43114,
    blockExplorer: "https://cchain.explorer.avax.network/",
    rpcUrl: `https://api.avax.network/ext/bc/C/rpc`,
    gasPrice: 225000000000,
  },
  testnetHarmony: {
    name: "testnetHarmony",
    color: "var(--primary-color)",
    chainId: 1666700000,
    blockExplorer: "https://explorer.pops.one/",
    rpcUrl: `https://api.s0.b.hmny.io`,
    gasPrice: 1000000000,
  },
  mainnetHarmony: {
    name: "mainnetHarmony",
    color: "var(--primary-color)",
    chainId: 1666600000,
    blockExplorer: "https://explorer.harmony.one/",
    rpcUrl: `https://api.harmony.one`,
    gasPrice: 1000000000,
  },
  fantom: {
    name: "fantom",
    color: "#1969ff",
    chainId: 250,
    blockExplorer: "https://ftmscan.com/",
    rpcUrl: `https://rpcapi.fantom.network`,
    gasPrice: 1000000000,
  },
  testnetFantom: {
    name: "testnetFantom",
    color: "var(--primary-color)",
    chainId: 4002,
    blockExplorer: "https://testnet.ftmscan.com/",
    rpcUrl: `https://rpc.testnet.fantom.network`,
    gasPrice: 1000000000,
    faucet: "https://faucet.fantom.network/",
  },
};

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};
