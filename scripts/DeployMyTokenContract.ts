import { ethers } from "ethers";
import * as dotenv from 'dotenv';
import { MyToken__factory } from "../typechain-types";
dotenv.config();

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) throw new Error("Missing environment private key");
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    const balance = await signer.getBalance();
    console.log(`The account ${signer.address} has a balance of ${balance} wei`);
     
    console.log("Deploying MyToken contract");
    const myTokenFactory = new MyToken__factory(signer);
    const ballotContract = await myTokenFactory.deploy();
    console.log("awaiting for confirmation...");
    const txReceipt = await ballotContract.deployTransaction.wait();
    console.log(`The MyToken contract was deployed at address ${ballotContract.address} in the block ${txReceipt.blockNumber}`);
    
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
