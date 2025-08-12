const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("BINToken", function () {
  let BINToken, bin, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    BINToken = await ethers.getContractFactory("BINToken");
    bin = await BINToken.deploy(); // 部署
  });

  it("初始供应量应为 1000 万 BIN", async function () {
    const supply = await bin.totalSupply();
    expect(supply).to.equal(ethers.parseUnits("10000000", 2)); // 1000万 BIN
  });

  it("网站领取 300 BIN", async function () {
    await bin.connect(addr1).claimFromWebsite();
    const bal = await bin.balanceOf(addr1.address);
    expect(bal).to.equal(ethers.parseUnits("300", 2)); // 300 BIN
  });

  it("爱发电发放 - 中级 2000 BIN", async function () {
    await bin.grantAfdianTier(addr1.address, 2);
    const bal = await bin.balanceOf(addr1.address);
    expect(bal).to.equal(ethers.parseUnits("2000", 2)); // 2000 BIN
  });
});
