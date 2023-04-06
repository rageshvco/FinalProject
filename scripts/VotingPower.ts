import { ethers } from "ethers";
import * as dotenv from 'dotenv';
import { MyToken__factory, TokenizedBallot__factory } from "../typechain-types";
dotenv.config();

async function main(){

    const args = process.argv;
    const argValues = args.slice(2);
    if(argValues.length<= 1) throw new Error("Missing address to check the voting power!");
    console.log(argValues);
    const myTokenDeployedAddress = argValues[0];
    const addressForVotingPower = argValues[1];
    
    console.log("Tokenized Ballot Deployed Address: " + myTokenDeployedAddress);
    console.log("Checking voting power of :" + addressForVotingPower);
   

    const provider = new ethers.providers.AlchemyProvider("goerli", process.env.ALCHEMY_API_KEY);
    const privateKey = process.env.PRIVATE_KEY;
    if(!privateKey || privateKey.length <= 0) throw new Error("Missing environment private key");
    //const block = await provider.getBlock("latest");
    //console.log(block);
    const wallet = new ethers.Wallet(privateKey);
    const signer = wallet.connect(provider);
    const balance = await signer.getBalance();
    console.log(`The account ${signer.address} has a balance of ${balance} wei`);
    

    console.log("Attach Tokenized Ballot contract");
    const tokenizedballotFactory = new TokenizedBallot__factory(signer);
    const tokenizedBallotContract = await tokenizedballotFactory.attach(myTokenDeployedAddress);
    
    console.log("Call the vote function");
    const txProposals = await tokenizedBallotContract.proposals.forEach(element => {
        element
    });;
    console.log(`Proposals  ${txProposals} `);

    console.log("Call the vote function");
    const txVotingPower = await tokenizedBallotContract.votingPower(addressForVotingPower);
    console.log(`Voting Power  ${addressForVotingPower} `);
    console.log(txVotingPower)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });