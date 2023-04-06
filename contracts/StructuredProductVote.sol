// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

interface IStructToken {
    function getPastVotes(address account, uint256 blockNumber) external view  returns (uint256);
}

contract StructuredProductVote {
    //Proposal is different templates of structured products
    struct Proposal {
        bytes32 name;   
        uint voteCount; 
    }

    uint256 public blockTarget;
    IStructToken public tokenContract;
    Proposal[] public proposals;

    mapping(address => uint256) public votingPowerSpent;
    
    constructor(bytes32[] memory proposalNames, address _tokenContract, uint256 _blockTarget) {
        tokenContract = IStructToken(_tokenContract);
        blockTarget = _blockTarget;
        for (uint i = 0; i < proposalNames.length; i++) {
           
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function vote(uint256 proposal, uint256 amount) external {
       // Check if that person is able to vote 
       require(votingPower(msg.sender) >= amount );
       votingPowerSpent[msg.sender] += amount;
       proposals[proposal].voteCount += amount;
    }

    function votingPower(address account) public view returns (uint256) {
        return tokenContract.getPastVotes(account, blockTarget) - 
        votingPowerSpent[account];
    }

    function winningProposal() public view
            returns (uint winningProposal_)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal_ = p;
            }
        }
    }

    function winnerName() external view
            returns (bytes32 winnerName_)
    {
        winnerName_ = proposals[winningProposal()].name;
    }
}