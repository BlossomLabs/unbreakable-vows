pragma solidity 0.7.6;
pragma abicoder v2;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/utils/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "./interfaces/IArbitrator.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract UnbreakableVow {
  using EnumerableSet for EnumerableSet.AddressSet;
  using SafeERC20 for IERC20;

  event Signed(address indexed signer, uint256 settingId);
  event SettingChanged(uint256 settingId);

  enum UnbreakableVowState { UNSIGNED, ACTIVE, TERMINATED }
  enum UserState { UNSIGNED, SIGNED, OFFERS_TERMINATION }


  struct Setting {
    IArbitrator arbitrator;
    string title;
    bytes content;
  }

  struct Party {
    uint256 lastSettingIdSigned;
    IERC20 collateralToken;
    uint256 collateralAmount;
    uint256 depositedAmount;
    bool offerTermination;
  }

  UnbreakableVowState public state = UnbreakableVowState.UNSIGNED;
  uint256 public currentSettingId = 0; // All parties have to sign in order to update the setting
  uint256 private nextSettingId = 1;
  mapping (uint256 => Setting) private settings; // List of historic agreement settings indexed by ID (starting at 1)
  EnumerableSet.AddressSet private parties;
  mapping (address => Party) private partiesInfo;       // Mapping of address => last agreement setting signed

  /**
   * @notice Initialize Agreement for "`_title`" and content "`_content`", with arbitrator `_arbitrator`
   * @param _arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @param _title String indicating a short description
   * @param _content Link to a human-readable text that describes the initial rules for the Agreement
   * @param _parties List of addresses that must sign the Agreement
  */
  constructor(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content,
    address[] memory _parties,
    IERC20[] memory _collateralTokens,
    uint256[] memory _collateralAmounts
  ) {
    for (uint i = 0; i < _parties.length; i++) {
      parties.add(_parties[i]);
      partiesInfo[_parties[i]] = Party(0, _collateralTokens[i], _collateralAmounts[i], 0, false);
    }
    proposeSetting(_arbitrator, _title, _content);
  }

  /**
   * @notice Propose and sign Agreement to title "`_title`" and content "`_content`", with arbitrator `_arbitrator`
   * @dev Initialization check is implicitly provided by the `auth()` modifier
   * @param _arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @param _title String indicating a short description
   * @param _content Link to a human-readable text that describes the new rules for the Agreement
   */
  function proposeSetting(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content
  )
    public
  {
    sign(_newSetting(_arbitrator, _title, _content));
  }

  /**
    * @notice Sign the agreement up-to setting #`_settingId`
    * @dev Callable by any party
    * @param _settingId Last setting ID the user is agreeing with
    */
  function sign(uint256 _settingId) public {
    uint256 lastSettingIdSigned = partiesInfo[msg.sender].lastSettingIdSigned;
    require (state != UnbreakableVowState.TERMINATED, "ERROR_CAN_NOT_SIGN_TERMINATED_VOW");
    require(lastSettingIdSigned != _settingId, "ERROR_SIGNER_ALREADY_SIGNED");
    require(_settingId < nextSettingId, "ERROR_INVALID_SIGNING_SETTING");

    // if (partiesInfo[msg.sender].depositedAmount < partiesInfo[msg.sender].collateralAmount) {
    //   partiesInfo[msg.sender].collateralToken.safeTransferFrom(
    //     msg.sender,
    //     address(this),
    //     partiesInfo[msg.sender].collateralAmount - partiesInfo[msg.sender].depositedAmount
    //   );
    //   partiesInfo[msg.sender].depositedAmount = partiesInfo[msg.sender].collateralAmount;
    // }

    partiesInfo[msg.sender].lastSettingIdSigned = _settingId;
    emit Signed(msg.sender, _settingId);
    _changeSettingIfPossible(_settingId);
  }

  function unstakeCollateral() public {
    require (state != UnbreakableVowState.ACTIVE, "ERROR_CAN_NOT_UNSTAKE_FROM_ACTIVE_VOW");
    // uint256 amount = partiesInfo[msg.sender].depositedAmount;
    // partiesInfo[msg.sender].collateralToken.transfer(msg.sender, amount);
    partiesInfo[msg.sender].depositedAmount = 0;
    partiesInfo[msg.sender].lastSettingIdSigned = 0;
  }

  function terminate(bool offersTermination) public{
    require (state == UnbreakableVowState.ACTIVE, "ERROR_CAN_NOT_TERMINATE_UNACTIVE_VOW");
    partiesInfo[msg.sender].offerTermination = offersTermination;
    _changeSettingIfPossible(0);
  }

  /**
   * @dev Tell the information related to an agreement setting
   * @param _settingId Identification number of the agreement setting
   * @return arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @return title String indicating a short description
   * @return content Link to a human-readable text that describes the current rules for the Agreement
   */
  function getSetting(uint256 _settingId)
    public
    view
    returns (IArbitrator arbitrator, string memory title, bytes memory content)
  {
    Setting storage setting = _getSetting(_settingId);
    arbitrator = setting.arbitrator;
    title = setting.title;
    content = setting.content;
  }

  function getCurrentSetting()
    public
    view
    returns (IArbitrator arbitrator, string memory title, bytes memory content)
  {
    return getSetting(currentSettingId == 0 ? 1 : currentSettingId);
  }

  function getParties()
    external
    view
    returns (
      address[] memory _parties,
      UserState[] memory _signed,
      address[] memory _collateralTokens,
      uint256[] memory _collateralAmounts,
      uint256[] memory _depositedAmounts
    )
  {
    _parties = new address[](parties.length());
    _signed = new UserState[](_parties.length);
    _collateralTokens = new address[](_parties.length);
    _collateralAmounts = new uint256[](_parties.length);
    _depositedAmounts = new uint256[](_parties.length);
    for(uint i=0; i < parties.length(); i++) {
      _parties[i] = parties.at(i);
      Party storage party = partiesInfo[_parties[i]];
      _signed[i] = party.offerTermination ? UserState.OFFERS_TERMINATION : party.lastSettingIdSigned != 0? UserState.SIGNED : UserState.UNSIGNED; 
      _collateralTokens[i] = address(party.collateralToken);
      _collateralAmounts[i] = party.collateralAmount;
      _depositedAmounts[i] = party.depositedAmount;
    }
  }

  /**
   * @dev Add new agreement settings
   * @param _arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @param _title String indicating a short description
   * @param _content Link to a human-readable text that describes the new rules for the Agreement
   * @return id Id of the new setting
   */
  function _newSetting(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content
  )
    internal
    returns (uint256 id)
  {
    require(Address.isContract(address(_arbitrator)), "ERROR_ARBITRATOR_NOT_CONTRACT");
    id = nextSettingId++;
    Setting storage setting = settings[id];
    setting.title = _title;
    setting.content = _content;
    setting.arbitrator = _arbitrator;
  }

  /**
   * @dev Fetch an agreement setting instance by identification number
   * @param _settingId Identification number of the agreement setting
   * @return Agreement setting instance associated to the given identification number
   */
  function _getSetting(uint256 _settingId) internal view returns (Setting storage) {
    require(_settingId >= 0 && _settingId < nextSettingId, "ERROR_SETTING_DOES_NOT_EXIST");
    return settings[_settingId];
  }


  function _changeSettingIfPossible(uint256 _settingId) private {
    if(_settingId != 0) {
      for (uint256 i = 0; i < parties.length(); i++) {
        if (partiesInfo[parties.at(i)].lastSettingIdSigned != _settingId) {
         return;
        }
      }
      currentSettingId = _settingId;
      state = UnbreakableVowState.ACTIVE;
      emit SettingChanged(_settingId);
    } else {
      for (uint256 i = 0; i < parties.length(); i++) {
        if (!partiesInfo[parties.at(i)].offerTermination) {
          return;
        }
      }
      state = UnbreakableVowState.TERMINATED;
    }
  }
}
