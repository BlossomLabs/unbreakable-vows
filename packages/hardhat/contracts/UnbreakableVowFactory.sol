pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "./UnbreakableVow.sol";
import "./Arbitrator.sol";

contract UnbreakableVowFactory {

  event NewUnbreakableVow(address indexed vow, address indexed party);
  event NewArbitrator(address arbitrator, address owner);

  function createUnbreakableVow(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content,
    address[] memory _parties,
    IERC20[] memory _collateralTokens,
    uint256[] memory _collateralAmounts
  ) public {
    UnbreakableVow unbreakableVow = new UnbreakableVow(_arbitrator, _title, _content, _parties, _collateralTokens, _collateralAmounts);
    for(uint i = 0; i < _parties.length; i++) {
      emit NewUnbreakableVow(address(unbreakableVow), _parties[i]);
    }
  }

  function createArbitrator(address owner) public {
    Arbitrator arbitrator = new Arbitrator();
    arbitrator.transferOwnership(owner);
    emit NewArbitrator(address(arbitrator), owner);
  }
}