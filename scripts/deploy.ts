// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers } from "hardhat";

async function main() {
  const ERC20UpgradeableFactory = await ethers.getContractFactory(
    "MintableERC20Upgradeable"
  );
  const erc20 = await (await ERC20UpgradeableFactory.deploy()).deployed();

  console.log(
    "deployed ERC20 implementation (probably don't need this): ",
    erc20.address
  );

  console.log("sleeping 1m");
  await new Promise((r) => setTimeout(r, 60000)); // sleep 1m

  // Verify ERC20

  // await hre.run("verify:verify", {
  //   address: erc20.address,
  //   constructorArguments: [],
  //   contract: "contracts/MintableERC20Upgradeable.sol:MintableERC20Upgradeable",
  //   libraries: [],
  // });

  const ProxyFactory = await ethers.getContractFactory("ERC1967Proxy");
  const proxy = await (
    await ProxyFactory.deploy(erc20.address, "0x")
  ).deployed();

  console.log("deployed proxied token to: ", proxy.address);

  console.log("sleeping 1m");
  await new Promise((r) => setTimeout(r, 60000)); // sleep 1m

  // Verify

  // await hre.run("verify:verify", {
  //   address: proxy.address,
  //   constructorArguments: [erc20.address, "0x"],
  //   contract: "contracts/ERC1967Proxy.sol:ERC1967Proxy",
  //   libraries: [],
  // });

  // ===============

  const Receiver = await ethers.getContractFactory("MetadataReceiver");
  const receiver = await (await Receiver.deploy()).deployed();

  console.log("MetadataReceiver deployed to:", receiver.address);

  console.log("sleeping 1m");
  // await new Promise((r) => setTimeout(r, 60000)); // sleep 1m

//   await hre.run("verify:verify", {
//     address: receiver.address,
//     constructorArguments: [],
//     contract: "contracts/Metadata.sol:MetadataReceiver",
//     libraries: [],
//   });
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
