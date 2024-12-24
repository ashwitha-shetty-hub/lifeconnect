pragma solidity ^0.8.21; // SPDX-License-Identifier: MIT

import "./DonorRegistry.sol";
import "./RecipientRegistry.sol";

contract OrganDonationSystem {
    DonorRegistry public donorRegistry;
    RecipientRegistry public recipientRegistry;

    constructor(address _donorRegistryAddress, address _recipientRegistryAddress) {
        donorRegistry = DonorRegistry(_donorRegistryAddress);
        recipientRegistry = RecipientRegistry(_recipientRegistryAddress);
    }

    function matchDonorToRecipient(address _donorAddress, address _recipientAddress) public view returns (bool) {
        DonorRegistry.Donor memory donor = donorRegistry.getDonor(_donorAddress);
        RecipientRegistry.Recipient memory recipient = recipientRegistry.getRecipient(_recipientAddress);

        // Simple matching logic based on blood group and organ
        if (keccak256(abi.encodePacked(donor.bloodGroup)) == keccak256(abi.encodePacked(recipient.bloodGroup)) &&
            keccak256(abi.encodePacked(donor.organs[0])) == keccak256(abi.encodePacked(recipient.organ))) {
            return true; // Match found
        }
        return false; // No match
    }
}
