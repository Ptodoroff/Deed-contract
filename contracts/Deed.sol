pragma solidity 0.8.15;

contract Deed {
    address public lawyer;
    address  payable public beneficiary;
    uint  public donation_date;

    modifier onlyLawyer {
        require(msg.sender == lawyer, " Only the lawyer can execute this fn().");
        _;
    }

    constructor ( address _address, address payable _beneficiary, uint date)   {       // I define the construcotor as payble because  I want to send the funds upon deployment.
        _address=lawyer;
        beneficiary = _beneficiary;
        donation_date = date +block.timestamp;
    }

    function send_funds () private {                                                            //funds will be sent to the inheritor on the agreed date.
        require( block.timestamp >= donation_date, "Funds are still locked");
        beneficiary.transfer(address(this).balance);

    }
 

     function suddenDeath () external onlyLawyer {                                              // option to send the funds earlier in case of premature death of the realtives.
        beneficiary.transfer(address(this).balance);
     }









}