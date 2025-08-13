import { ethers } from "ethers";
import BINTokenArtifact from "./contracts/BINToken.json";

const CONTRACT_ADDRESS = "0x672c819E5447b814d06C8B13d295e7FFE39C7862";

export async function getContract() {
  if (!window.ethereum) {
    alert("请先安装 MetaMask");
    throw new Error("MetaMask not found");
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const BINTokenABI = BINTokenArtifact.abi;
  return new ethers.Contract(CONTRACT_ADDRESS, BINTokenABI, signer);
}
