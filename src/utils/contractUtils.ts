import { ethers } from "ethers";
import DonorRegistry from "../contracts/DonorRegistry.sol";
import RecipientRegistry from "../artifacts/contracts/RecipientRegistry.sol/RecipientRegistry.json";
import OrganDonationSystem from "../artifacts/contracts/OrganDonationSystem.sol/OrganDonationSystem.json";

// Extend the window interface
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Set up provider
const provider = new ethers.providers.Web3Provider(window.ethereum);

// Request account access
async function requestAccount() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed!");
  }
  await window.ethereum.request({ method: "eth_requestAccounts" });
}

// Create contract instances
const donorRegistryAddress = "YOUR_DONOR_REGISTRY_CONTRACT_ADDRESS";
const recipientRegistryAddress = "YOUR_RECIPIENT_REGISTRY_CONTRACT_ADDRESS";
const organDonationSystemAddress = "YOUR_ORGAN_DONATION_SYSTEM_CONTRACT_ADDRESS";

const donorRegistryContract = new ethers.Contract(donorRegistryAddress, DonorRegistry.abi, provider);
const recipientRegistryContract = new ethers.Contract(recipientRegistryAddress, RecipientRegistry.abi, provider);
const organDonationSystemContract = new ethers.Contract(organDonationSystemAddress, OrganDonationSystem.abi, provider);

export { requestAccount, donorRegistryContract, recipientRegistryContract, organDonationSystemContract };
