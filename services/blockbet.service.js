const config = require("../server/config");
const db = require("../helpers/db");

const Web3 = require("web3");
const Web3HttpProvider = require("web3-providers-http");
const fs = require("fs");

const provider = new Web3HttpProvider("HTTP://127.0.0.1:7545");

const web3 = new Web3(provider);
const abiArray = JSON.parse(
  fs.readFileSync(
    config.projectpath + "/smart-contract/build/contracts/BlockBet.json",
    "utf-8"
  )
);
const contractAddress = config.contract_address;

let transactionObject = {
  nonce: 0,
  gas: 150000,
  data: 0,
  from: "",
  to: contractAddress,
};

const contract = new web3.eth.Contract(abiArray.abi, contractAddress);

module.exports = {
  createBet,
  makeBet,
  revealWinner,
  getBets,
  getBetUsers,
  getBet,
  getUserById,
  getUserByAddress,
  getNumOfBets,
  getUserBets,
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createBet(_userId, _pubAddress, _optionOne, _optionTwo) {
  try{
    let tx_builder = contract.methods.createBet(_optionOne, _optionTwo);
    let encoded_tx = tx_builder.encodeABI();
    transactionObject.nonce = web3.eth.getTransactionCount(_pubAddress);
    transactionObject.from = _pubAddress;
    transactionObject.data = encoded_tx

    return await sendTransaction(transactionObject, _userId);
  }catch (error) {
    return error;
  }
}

async function sendTransaction(_transactionObject, _userId){
  try{
    const user = await db.User.findByPk(_userId, {
      attributes: ["id", "email", "address", "public_key", "private_key"],
    });
    const signedTransaction = await web3.eth.accounts
    .signTransaction(
      _transactionObject,
      user.dataValues.private_key);
    const data = web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    return data;
  }catch (error) {
    return error;
  }
}

async function makeBet(_userId, _pubAddress, _betId, _option) {
  try{
    let tx_builder = contract.methods.makeBet(_betId, _option);
    let encoded_tx = tx_builder.encodeABI();
    transactionObject.nonce = web3.eth.getTransactionCount(_pubAddress);
    transactionObject.from = _pubAddress;
    transactionObject.data = encoded_tx

    const data = await sendTransaction(transactionObject, _userId);
    return data;
  }catch (error) {
    return error;
  }
}

async function revealWinner(_userId, _pubAddress, _betId) {
  const modulus = getRndInteger(0, 1000000);
  try{
    let tx_builder = contract.methods.revealWinner(_betId, modulus);
    let encoded_tx = tx_builder.encodeABI();
    transactionObject.nonce = web3.eth.getTransactionCount(_pubAddress);
    transactionObject.from = _pubAddress;
    transactionObject.data = encoded_tx

    const data = await sendTransaction(transactionObject, _userId);
    return data;
  }catch (error) {
    return error;
  }
}

async function getUserBets(_userId, _pubAddress) {
  return await contract.methods.getUserBets().call({ from: _pubAddress });
}

async function getBets() {
  let result = [];
  try {
    const data = await contract.methods.getBets().call();
    for (let i = 0; i < data.length; i++) {
      result.push({
        id: data[i].id,
        owner: data[i].owner,
        optionOne: data[i].optionOne,
        optionTwo: data[i].optionTwo,
        optionOneCount: data[i].optionOneCount,
        optionTwoCount: data[i].optionTwoCount,
        numBettors: data[i].numBettors,
        winner: data[i].winner,
        status: data[i].status,
      });
    }
  } catch (error) {
    return error;
  }
  return result;
}

async function getBetUsers(_betId) {
  let result = [];
  const data = await contract.methods.getBetUsers(_betId).call();

  for (let i = 0; i < data.length; i++) {
    result.push({
      id: data[i][0],
      address: data[i][1],
      choice: data[i][2],
    });
  }
  return result;
}

async function getBet(_betId) {
  const data = await contract.methods.getBet(_betId).call();
  return { status: data[0], data: data[1] };
}

async function getUserById(_betId, _userId) {
  const data = await contract.methods.getUserById(_betId, _userId).call();
  return { status: data[0], data: data[1] };
}

async function getUserByAddress(_betId, _userAddress) {
  const data = await contract.methods
    .getUserByAddress(_betId, _userAddress)
    .call();
  return { status: data[0], data: data[1] };
}

async function getNumOfBets() {
  const data = await contract.methods.getNumOfBets().call();
  return { status: data[0], data: data[1] };
}
