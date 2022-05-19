import { expect } from "chai";
import { ethers } from "hardhat";

describe("Metadata", function () {
  it("Should emit bytes", async function () {
    const [owner] = await ethers.getSigners();
    const Receiver = await ethers.getContractFactory("MetadataReceiver");
    const receiver = await Receiver.deploy();

    await receiver.deployed();

    const bytes = ethers.utils.formatBytes32String("test bytes");

    await expect(receiver.emitBytes(bytes))
      .to.emit(receiver, "MetadataReceived")
      .withArgs(owner.address, bytes);
  });
});
