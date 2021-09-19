const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");
const authorize = require("../middlewares/authorize");
const blockbetService = require("../services/blockbet.service");
const successHandler = require("../middlewares/success-handler");

// routes
router.post("/createBet", authorize, createBetSchema, createBet);
router.post("/makeBet", authorize, makeBetSchema, makeBet);
router.post("/revealWinner", authorize, betIdSchema, revealWinner);
router.get(["/getBets", "/"], getBets);
router.get("/bet/:id", betIdSchema, getBet);
router.get("/bet/:betId/user/:userId", userByIdSchema, getUserById);
router.get("/bet/:betId/user/address/:userAddress", userByAddressSchema, getUserByAddress);
router.get("/bet/user/bets", authorize, getUserBets);
router.get("/getBetNums", getNumOfBets);

module.exports = router;

function createBetSchema(req, res, next) {
  const schema = Joi.object({
    optionOne: Joi.string().required(),
    optionTwo: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function makeBetSchema(req, res, next) {
  const schema = Joi.object({
    betId: Joi.number().required(),
    option: Joi.number().required(),
  });
  validateRequest(req, next, schema);
}

function betIdSchema(req, res, next) {
    const schema = Joi.object({
      id: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function userByIdSchema(req, res, next) {
    const schema = Joi.object({
      betId: Joi.number().required(),
      userId: Joi.number().required(),
    });
    validateRequest(req, next, schema);
}

function userByAddressSchema(req, res, next) {
    const schema = Joi.object({
      betId: Joi.number().required(),
      userAdress: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function createBet(req, res, next) {
    blockbetService.createBet(req.user.id, req.user.address, req.body.optionOne, req.body.optionTwo)
    .then((data) => successHandler(res, "New bet has been created", data))
    .catch(next);
}

function makeBet(req, res, next) {
    blockbetService.makeBet(req.user.id, req.user.address, req.body.betId, req.body.option)
    .then(() => successHandler(res, "Bet has been made"))
    .catch(next);
}

function revealWinner(req, res, next) {
    blockbetService.revealWinner(req.user.id, req.user.address, req.body.id)
    .then((data) => successHandler(res, "Winner has been revealed", data))
    .catch(next);
}

function getUserBets(req, res, next) {
    blockbetService.getUserBets(req.user.id, req.user.address)
    .then((data) => {
      data.userAddress = req.user.address 
      return successHandler(res, "Got user bets", data);
    } )
    .catch(next);
}

function getBets(req, res, next) {
    blockbetService.getBets()
    .then((data) => successHandler(res, "Got all bets", data))
    .catch(next);
}

function getBet(req, res, next) {
    blockbetService.getBet(req.params.id)
    .then((data) => successHandler(res, `Got bet of id ${req.params.id}`, data))
    .catch(next);
}

function getUserById(req, res, next) {
    blockbetService.getUserById(req.params.betId, req.params.userId)
    .then((data) => successHandler(res, `Got user of id ${req.params.userId}`, data))
    .catch(next);
}

function getUserByAddress(req, res, next) {
    blockbetService.getUserByAddress(req.params.betId, req.params.userAddress)
    .then((data) => successHandler(res, `Got user of address ${req.params.userAddress}`, data))
    .catch(next);
}

function getNumOfBets(req, res, next) {
    blockbetService.getNumOfBets()
    .then((data) => successHandler(res, `Got total number of Bets`, data))
    .catch(next);
}
