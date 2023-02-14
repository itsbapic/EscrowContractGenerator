# Decentralized Escrow Application

This is an Escrow Dapp built with [Hardhat](https://hardhat.org/).

## Project Layout

There are three top-level folders:

1. `/app` - contains the front-end application
2. `/contracts` - contains the solidity contract
3. `/tests` - contains tests for the solidity contract

## Setup

Install dependencies in the top-level directory with `npm install`.

After you have installed hardhat locally, you can use commands to test and compile the contracts, among other things. To learn more about these commands run `npx hardhat help`.

Compile the contracts using `npx hardhat compile`. The artifacts will be placed in the `/app` folder, which will make it available to the front-end. This path configuration can be found in the `hardhat.config.js` file.

## Front-End

`cd` into the `/app` directory and run `npm install`

To run the front-end application run `npm start` from the `/app` directory. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


# Grading Rubric
## Basics:
1 point - briefly describe how you achieved the goals of the project (in the README.md) ✅
1 point - project compiles and run ✅

## Frontend:
2 points - Proper use of React (state, hooks, props) ✅

## Design:
2 point - UI (how creative is it) ✅
2 point - UX (how usable is it) ✅

## Challenges
1 point - for deploying dApp on goerli network 
2 points - for adding wei to ether conversion ✅
3 points - for adding a server to keep track of deployed escrow contracts (you can use express.js)
3 points - for adding 2 new features to Escrow.sol [(ideas for features)](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/utils/escrow) ✅(2/2) (Refunding & Toggling Arbiter Actionability)
3 points - for adding tests for your features ✅(2/2)

# How I got this project done
This week was especially interesting for me since I have learned a lot about multiple technologies/frameworks. I finally feel I have a good understanding of useEffect and useState within React, and my solidity testing skills are slowly coming together as well.