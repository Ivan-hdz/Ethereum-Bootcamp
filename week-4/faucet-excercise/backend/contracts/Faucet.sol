// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Faucet {
    constructor() {
        
    }
    function requestEther(uint _quantity) external {
        require(_quantity <= 10 ** 18, 'Max quantity per transaction reached');
        payable(msg.sender).transfer(_quantity);
    }
    function balance() external view returns(uint){
        return address(this).balance;
    }
    // https://ethereum.stackexchange.com/questions/81994/what-is-the-receive-keyword-in-solidity
    receive() external payable {}
}