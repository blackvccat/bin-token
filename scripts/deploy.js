const hre = require("hardhat");

async function main() {
  const BINToken = await hre.ethers.getContractFactory("BINToken");
  
  // 部署合约
  const binToken = await BINToken.deploy();

  // 等待部署完成（v6 新方法）
  await binToken.waitForDeployment();

  // v6 获取地址
  const address = await binToken.getAddress();
  console.log("BIN Token deployed to:", address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
