const Deed = artifacts.require("Deed");
const one = "0x46bcd4e0e1a7782c9d03577af2f90482f634e420";
const two = "0x181c5bd230f9f47d50045f16a211b1f06769e106";

module.exports = function (deployer) {
  deployer.deploy(Deed,one,two,20,{value:100000});
};
