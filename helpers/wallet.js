const HDWallet = require("ethereum-hdwallet");
const config = require("../server/config");
const hdwallet = HDWallet.fromMnemonic(config.mnemonic);
const mywallet = hdwallet.derive(`m/44'/60'/0'/0`);

module.exports = {
  getPublicKey,
  getPrivateKey,
  getAddress,
};

function getPublicKey(id) {
  return `0x${mywallet.derive(id).getPublicKey().toString("hex")}`;
}

function getPrivateKey(id) {
  return `0x${mywallet.derive(id).getPrivateKey().toString("hex")}`;
}

function getAddress(id) {
  return `0x${mywallet.derive(id).getAddress().toString("hex")}`;
}
