const Deed = artifacts.require("Deed");

module.exports = function (deployer) {
  deployer.deploy(Deed);
};
