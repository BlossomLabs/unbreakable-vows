pragma solidity 0.7.6;

import "@openzeppelin/contracts/mocks/ERC20Mock.sol";

// You might think this file is a bit odd, but let me explain.
// We only use these contract in our tests, which means
// Truffle will not compile it for us, because it is
// from an external dependency.
//
// We are now left with some options:
// - Copy/paste these contracts
// - Or trick Truffle by claiming we use it in a Solidity test
//
// You know which one I went for.


contract TestImports {
    constructor() {
        // solium-disable-previous-line no-empty-blocks
    }
}