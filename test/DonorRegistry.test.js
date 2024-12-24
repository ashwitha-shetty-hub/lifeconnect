const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DonorRegistry", function () {
    let donorRegistry;
    let owner;

    beforeEach(async function () {
        const DonorRegistry = await ethers.getContractFactory("DonorRegistry");
        donorRegistry = await DonorRegistry.deploy();
        await donorRegistry.deployed();
        [owner] = await ethers.getSigners();
    });

    it("should register a donor", async function () {
        await donorRegistry.registerDonor("Alice", "O+", ["Kidney"]);
        const donor = await donorRegistry.getDonor(owner.address);
        expect(donor.name).to.equal("Alice");
        expect(donor.bloodGroup).to.equal("O+");
    });

    it("should not allow duplicate registration", async function () {
        await donorRegistry.registerDonor("Alice", "O+", ["Kidney"]);
        await expect(donorRegistry.registerDonor("Alice", "O+", ["Kidney"]))
            .to.be.revertedWith("Donor already registered");
    });
});
