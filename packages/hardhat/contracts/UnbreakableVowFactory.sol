pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "./UnbreakableVow.sol";
import "./Arbitrator.sol";

contract UnbreakableVowFactory {

  event NewUnbreakableVow(address vow, address[] parties);
  event NewArbitrator(address arbitrator, address owner);

  function createUnbreakableVow(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content,
    address[] memory _parties
  ) public {
    UnbreakableVow unbreakableVow = new UnbreakableVow(_arbitrator, _title, _content, _parties);
    emit NewUnbreakableVow(address(unbreakableVow), _parties);
  }

  function createArbitrator(address owner) public {
    Arbitrator arbitrator = new Arbitrator();
    arbitrator.transferOwnership(owner);
    emit NewArbitrator(address(arbitrator), owner);
  }
}