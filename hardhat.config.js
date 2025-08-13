require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

// 从 .env 中读取变量
const { SEPOLIA_RPC_URL, PRIVATE_KEY, ETHERSCAN_API_KEY } = process.env;

module.exports = {
  solidity: "0.8.28",
  networks: {
    // Sepolia 测试网配置
    sepolia: {
      
      url: SEPOLIA_RPC_URL || "",
      accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
    },
    // 本地节点配置
    localhost: {
      url: "http://127.0.0.1:8545/",
    },
  },
  etherscan: {
    // v2 API 配置（新写法，只需要一个 key）
    apiKey: ETHERSCAN_API_KEY || "",
  },
  sourcify: {
  enabled: true,
}

};
