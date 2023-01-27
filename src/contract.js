import { ethers } from "ethers";

const tokenAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const tokenAbi = [
  "constructor(uint256 initialSupply)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)",
  "function increaseAllowance(address spender, uint256 addedValue) returns (bool)",
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
];
const exchangeAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
const exchangeAbi = [
  "constructor(address _token, uint256 _price)",
  "function buy(uint256 amount) payable",
  "function giveExchangeTokens()",
  "function sell(uint256 amount) payable",
  "function token() view returns (address)",
  "function viewApproved() view returns (uint256)",
  "function viewBalance() view returns (uint256)",
  "function viewPrice(uint256 amount) view returns (uint256)",
];
const provider = new ethers.providers.Web3Provider(window.ethereum);

export const connect = async () => {
  await provider.send("eth_requestAccounts", []);
  return getContracts();
};

export const getContracts = async () => {
  const signer = provider.getSigner();
  const tokenContract = new ethers.Contract(tokenAddress, tokenAbi, signer);
  const exchangeContract = new ethers.Contract(
    exchangeAddress,
    exchangeAbi,
    signer
  );
  return {
    signer: signer,
    tokenContract: tokenContract,
    exchangeContract: exchangeContract,
  };
};
