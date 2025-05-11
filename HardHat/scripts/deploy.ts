import { ethers } from "hardhat";

async function main() {
    const treeToken = await ethers.deployContract("TreeToken");
    await treeToken.waitForDeployment();
    console.log("TreeToken deployed to: ", await treeToken.getAddress())
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })