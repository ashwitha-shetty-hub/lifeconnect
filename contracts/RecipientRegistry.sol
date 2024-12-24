pragma solidity ^0.8.21; // SPDX-License-Identifier: MIT

contract RecipientRegistry {
    struct Recipient {
        string name;
        string bloodGroup;
        string organ;
        string urgencyLevel;
        uint256 age;
        string contact;
        uint256 registrationDate;
    }

    mapping(address => Recipient) public recipients;
    address[] public recipientAddresses;

    function registerRecipient(string memory _name, string memory _bloodGroup, string memory _organ, string memory _urgencyLevel, uint256 _age, string memory _contact) public {
        require(recipients[msg.sender].registrationDate == 0, "Recipient already registered");

        recipients[msg.sender] = Recipient({
            name: _name,
            bloodGroup: _bloodGroup,
            organ: _organ,
            urgencyLevel: _urgencyLevel,
            age: _age,
            contact: _contact,
            registrationDate: block.timestamp
        });

        recipientAddresses.push(msg.sender);
    }

    function getRecipient(address _recipientAddress) public view returns (Recipient memory) {
        return recipients[_recipientAddress];
    }

    function getRecipientCount() public view returns (uint256) {
        return recipientAddresses.length;
    }
}
