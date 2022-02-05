pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "./interfaces/IArbitrator.sol";

// https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol

contract UnbreakableVow {


  event SettingChanged(uint256 settingId);

  struct Setting {
    IArbitrator arbitrator;
    string title;
    bytes content;
  }

  uint256 private nextSettingId = 0;
  mapping (uint256 => Setting) private settings; // List of historic agreement settings indexed by ID (starting at 1)
  address[] private parties;

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
    address[] memory _parties
  ) {
    _newSetting(_arbitrator, _title, _content);
    parties = _parties;
  }

  /**
   * @notice Update Agreement to title "`_title`" and content "`_content`", with arbitrator `_arbitrator`
   * @dev Initialization check is implicitly provided by the `auth()` modifier
   * @param _arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @param _title String indicating a short description
   * @param _content Link to a human-readable text that describes the new rules for the Agreement
   */
  function changeSetting(
    IArbitrator _arbitrator,
    string memory _title,
    bytes memory _content
  )
    external
  {
    _newSetting(_arbitrator, _title, _content);
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

  function getLastSetting()
    public
    view
    returns (IArbitrator arbitrator, string memory title, bytes memory content)
  {
    return getSetting(nextSettingId - 1);
  }

  /**
   * @dev Change agreement settings
   * @param _arbitrator Address of the IArbitrator that will be used to resolve disputes
   * @param _title String indicating a short description
   * @param _content Link to a human-readable text that describes the new rules for the Agreement
   */
  function _newSetting(IArbitrator _arbitrator, string memory _title, bytes memory _content) internal {
    require(Address.isContract(address(_arbitrator)), "ERROR_ARBITRATOR_NOT_CONTRACT");

    uint256 id = nextSettingId++;
    Setting storage setting = settings[id];
    setting.title = _title;
    setting.content = _content;
    setting.arbitrator = _arbitrator;

    emit SettingChanged(id);
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
}
