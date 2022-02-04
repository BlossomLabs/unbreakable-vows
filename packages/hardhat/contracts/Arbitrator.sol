pragma solidity 0.7.6;
//SPDX-License-Identifier: MIT

import "hardhat/console.sol";
import "./interfaces/IArbitrator.sol";
import "./interfaces/IArbitrable.sol";

import "@openzeppelin/contracts/access/Ownable.sol";

contract Arbitrator is IArbitrator, Ownable {

  event DisputeStateChanged(uint256 indexed disputeId, DisputeState indexed state);
  event EvidenceSubmitted(uint256 indexed disputeId, address indexed submitter, bytes evidence);
  event EvidencePeriodClosed(uint256 indexed disputeId, uint64 indexed termId);
  event NewDispute(uint256 indexed disputeId, IArbitrable indexed subject, bytes metadata);
  event RulingComputed(uint256 indexed disputeId, uint8 indexed ruling);
  
  enum DisputeState {
    PreDraft,
    Adjudicating,
    Ruled
  }

  struct Dispute {
    IArbitrable subject;           // Arbitrable associated to a dispute
    uint8 possibleRulings;         // Number of possible rulings jurors can vote for each dispute
    uint8 finalRuling;             // Winning ruling of a dispute
    DisputeState state;            // State of a dispute: pre-draft, adjudicating, or ruled
  }

  Dispute[] internal disputes;

  /**
   * @dev Create a dispute over the Arbitrable sender with a number of possible rulings
   * @param _possibleRulings Number of possible rulings allowed for the dispute
   * @param _metadata Optional metadata that can be used to provide additional information on the dispute to be created
   * @return disputeId Dispute identification number
   */
  function createDispute(uint256 _possibleRulings, bytes memory _metadata) external override returns (uint256 disputeId) {
    require(_possibleRulings == 1, "ERROR_INVALID_RULING_OPTIONS");

    // Create the dispute
    disputeId = disputes.length;
    Dispute storage dispute = disputes[disputeId];
    dispute.subject = IArbitrable(msg.sender);
    dispute.possibleRulings = uint8(_possibleRulings);
    emit NewDispute(disputeId, IArbitrable(msg.sender), _metadata);
  }

  /**
   * @dev Submit evidence for a dispute
   * @param _disputeId Id of the dispute in the Protocol
   * @param _submitter Address of the account submitting the evidence
   * @param _evidence Data submitted for the evidence related to the dispute
   */
  function submitEvidence(uint256 _disputeId, address _submitter, bytes memory _evidence) external override {
    Dispute storage dispute = disputes[_disputeId];
    require(dispute.subject == IArbitrable(msg.sender), "ERROR_SUBJECT_NOT_DISPUTE_SUBJECT");
    emit EvidenceSubmitted(_disputeId, _submitter, _evidence);
  }

  /**
   * @dev Close the evidence period of a dispute
   * @param _disputeId Identification number of the dispute to close its evidence submitting period
   */
  function closeEvidencePeriod(uint256 _disputeId) external override {
    Dispute storage dispute = disputes[_disputeId];
    require(dispute.subject == IArbitrable(msg.sender), "ERROR_SUBJECT_NOT_DISPUTE_SUBJECT");
    emit EvidencePeriodClosed(_disputeId, 0);
  }

  /**
   * @notice Rule dispute #`_disputeId` to ruling number `_ruling`
   * @param _disputeId Identification number of the dispute to be ruled
   * @param _ruling Ruling number of the given dispute
   */
  function setRuling(uint256 _disputeId, uint8 _ruling) onlyOwner external {
    Dispute storage dispute = disputes[_disputeId];
    require (dispute.state != DisputeState.Ruled, "ERROR_DISPUTE_ALREADY_RULED");
    require (_ruling != 0, "ERROR_INVALID_RULING");
    dispute.finalRuling = _ruling;
    dispute.state = DisputeState.Ruled;
    emit RulingComputed(_disputeId, dispute.finalRuling);
  }

  /**
   * @notice Rule dispute #`_disputeId` if ready
   * @param _disputeId Identification number of the dispute to be ruled
   * @return subject Arbitrable instance associated to the dispute
   * @return ruling Ruling number computed for the given dispute
   */
  function rule(uint256 _disputeId) external override view returns (address subject, uint256 ruling) {
    Dispute storage dispute = disputes[_disputeId];
    subject = address(dispute.subject);
    ruling = dispute.finalRuling;
  }

  /**
   * @dev Tell the dispute fees information to create a dispute
   * @return recipient Address where the corresponding dispute fees must be transferred to
   * @return feeToken ERC20 token used for the fees
   * @return feeAmount Total amount of fees that must be allowed to the recipient
   */
  function getDisputeFees() external override pure returns (address recipient, ERC20 feeToken, uint256 feeAmount) {
    return (address(0), ERC20(0), 0);
  }

  /**
   * @dev Tell the subscription fees information for a subscriber to be up-to-date
   * @return recipient Address where the corresponding subscriptions fees must be transferred to
   * @return feeToken ERC20 token used for the subscription fees
   * @return feeAmount Total amount of fees that must be allowed to the recipient
   */
  function getSubscriptionFees(address /*_subscriber*/) external override pure returns (address recipient, ERC20 feeToken, uint256 feeAmount) {
    return (address(0), ERC20(0), 0);
  }
}
