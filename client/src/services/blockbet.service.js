import handleResponse from "../helpers/handleResponse";

export const blockbetService = {
  getBets,
  createBet,
  getUserBets,
  makeBet,
  revealWinner,
  getBet,
  getUserById,
  getUserByAddress,
  getNumOfBets
};

function makeBet(betId, option) {
  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ betId, option }),
  };
  return fetch('/api/makeBet', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function revealWinner(id) {
  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  };
  return fetch('/api/revealWinner', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getUserBets() {
  const requestOptions = {
    method: "GET",
    credentials: 'include',
  };
  return fetch('/api/bet/user/bets', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function createBet(optionOne, optionTwo) {
  const requestOptions = {
    method: "POST",
    credentials: 'include',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ optionOne, optionTwo }),
  };
  return fetch('/api/createBet', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getBets() {
  const requestOptions = {
    method: "GET",
  };
  return fetch('/api/getBets', requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getBet(betId) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`/api/bet/${betId}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getUserById(betId, userId) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`/api/bet/${betId}/user/${userId}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getUserByAddress(betId, userAddress) {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`/api/bet/${betId}/user/address/${userAddress}`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}

function getNumOfBets() {
  const requestOptions = {
    method: "GET",
  };
  return fetch(`/api/bet/getBetNums`, requestOptions)
    .then(handleResponse)
    .then((data) => {
      return data;
    });
}
