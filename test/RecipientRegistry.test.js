const { expect } = require("chai");
import { ethers } from "hardhat";

describe("RecipientRegistry", function () {
    let recipientRegistry;
    let owner;

    beforeEach(async function () {
        const RecipientRegistry = await ethers.getContractFactory("RecipientRegistry");
        recipientRegistry = await RecipientRegistry.deploy();
        await recipientRegistry.deployed();
        [owner] = await ethers.getSigners();
    });

    it("should register a recipient", async function () {
        await recipientRegistry.registerRecipient("Bob", "A+", "Kidney", "High", 30, "1234567890");
        const recipient = await recipientRegistry.getRecipient(owner.address);
        expect(recipient.name).to.equal("Bob");
        expect(recipient.bloodGroup).to.equal("A+");
    });

    it("should not allow duplicate registration", async function () {
        await recipientRegistry.registerRecipient("Bob", "A+", "Kidney", "High", 30, "1234567890");
        await expect(recipientRegistry.registerRecipient("Bob", "A+", "Kidney", "High", 30, "1234567890"))
            .to.be.revertedWith("Recipient already registered");
    });
});
