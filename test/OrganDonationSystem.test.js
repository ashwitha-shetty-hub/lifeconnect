const { expect } = require("chai");

import { ethers } from "hardhat";

describe("OrganDonationSystem", function () {
    let organDonationSystem;
    let donorRegistry;
    let recipientRegistry;
    let owner;

    beforeEach(async function () {
        const DonorRegistry = await ethers.getContractFactory("DonorRegistry");
        donorRegistry = await DonorRegistry.deploy();
        await donorRegistry.deployed();

        const RecipientRegistry = await ethers.getContractFactory("RecipientRegistry");
        recipientRegistry = await RecipientRegistry.deploy();
        await recipientRegistry.deployed();

        const OrganDonationSystem = await ethers.getContractFactory("OrganDonationSystem");
        organDonationSystem = await OrganDonationSystem.deploy(donorRegistry.address, recipientRegistry.address);
        await organDonationSystem.deployed();

        [owner] = await ethers.getSigners();
    });

    it("should match donor to recipient", async function () {
        await donorRegistry.registerDonor("Alice", "O+", ["Kidney"]);
        await recipientRegistry.registerRecipient("Bob", "O+", "Kidney", "High", 30, "1234567890");

        const isMatch = await organDonationSystem.matchDonorToRecipient(owner.address, owner.address);
        expect(isMatch).to.be.true;
    });

    it("should not match if blood groups do not match", async function () {
        await donorRegistry.registerDonor("Alice", "O+", ["Kidney"]);
        await recipientRegistry.registerRecipient("Bob", "A+", "Kidney", "High", 30, "1234567890");

        const isMatch = await organDonationSystem.matchDonorToRecipient(owner.address, owner.address);
        expect(isMatch).to.be.false;
    });
});
