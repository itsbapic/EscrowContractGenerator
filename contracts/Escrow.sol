// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

contract Escrow {
	address public arbiter;
	address public beneficiary;
	address public depositor;

	bool public isApproved;
	bool public isRefunded;

	constructor(address _arbiter, address _beneficiary) payable {
		arbiter = _arbiter;
		beneficiary = _beneficiary;
		depositor = msg.sender;
	}

	event Approved(uint);

	function approve() external {
		require(msg.sender == arbiter, "You are not the arbiter!");
		require(!isApproved && !isRefunded, "Contract has already been handled!");
		uint balance = address(this).balance;
		(bool sent, ) = payable(beneficiary).call{value: balance}("");
 		require(sent, "Failed to send Ether");
		emit Approved(balance);
		isApproved = true;
	}

	event Refunded(uint);

	function refund() external {
		require(msg.sender == arbiter, "You are not the arbiter!");
		require(!isApproved && !isRefunded, "Contract has already been handled!");
		uint balance = address(this).balance;
		(bool sent, ) = payable(depositor).call{value: balance}("");
		require(sent, "Failed to send ether!");
		emit Refunded(balance);
		isRefunded = true;
	}
}
