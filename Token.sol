pragma solidity ^0.4.16;
    contract SimpleStorage 
    { 
        uint storedData=1000; 
        function set(uint x) public{
            storedData = x;
            }
        function get() public constant returns (uint retVal){
            return storedData;
            }
    }