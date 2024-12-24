pragma solidity ^0.8.21; // SPDX-License-Identifier: MIT

contract DonorRegistry {
    struct Donor {
        string name;
        string bloodGroup;
        string[] organs;
        uint256 registrationDate;
        bool isAvailable;
    }

    mapping(address => Donor) public donors;
    address[] public donorAddresses;

    function registerDonor(string memory _name, string memory _bloodGroup, string[] memory _organs) public {
        require(donors[msg.sender].registrationDate == 0, "Donor already registered");

        donors[msg.sender] = Donor({
            name: _name,
            bloodGroup: _bloodGroup,
            organs: _organs,
            registrationDate: block.timestamp,
            isAvailable: true
        });

        donorAddresses.push(msg.sender);
    }

    function getDonor(address _donorAddress) public view returns (Donor memory) {
        return donors[_donorAddress];
    }

    function getDonorCount() public view returns (uint256) {
        return donorAddresses.length;
    }
}
