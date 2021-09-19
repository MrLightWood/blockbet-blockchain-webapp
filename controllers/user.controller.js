const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../middlewares/validate-request");
const authorize = require("../middlewares/authorize");
const userService = require("../services/user.service.js");
const successHandler = require("../middlewares/success-handler");

// routes
router.post("/authenticate", authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
router.post("/logout", logout);
//router.get("/", authorize, getAll);
router.get(["/current", "/"], authorize, getCurrent);
//router.get("/status", authorize, getStatus);
router.get("/status", getStatus, getStatusSuccess);
//router.get("/getCookie", getCookie);
router.get("/:id", authorize, getById);
router.put("/:id", authorize, updateSchema, update);
router.delete("/:id", authorize, _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    rememberMe: Joi.boolean().required(),
  });
  validateRequest(req, next, schema);
}

function logout(req, res, next) {
  try {
    res.clearCookie("access_token")
    successHandler(res, "Logged Out")
  } catch(error) {
    next();
  }
}

function authenticate(req, res, next) {
  userService
    .authenticate(req.body)
    .then((token) => {
      if (req.body.rememberMe) {
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: false,
            maxAge: 1000 * 3600 * 24,
            expires: new Date(Date.now() + 1000 * 3600 * 24),
          })
      } else {
        res
          .cookie("access_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: false,
          })
      }
      successHandler(res, "Authorized", req.body.email);
    })
    .catch(next);
}

function registerSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  userService
    .create(req.body)
    .then((data) => successHandler(res, "Registration successful", data))
    .catch(next);
}

function getStatus(req, res, next) {
  try {
    req.params.onlyStatus=true;
    return authorize(req, res, next);
  } catch(error){
    next(error);
  }
}

function getStatusSuccess(req, res, next) {
  return successHandler(res, "Authorized");
}


async function getCurrent(req, res, next) {
  userService.getById(req.user.id)
  .then((data) => successHandler(res, `Got user of id ${req.user.id}`, data))
  .catch(next);
}

function getById(req, res, next) {
  userService
    .getById(req.params.id)
    .then((user) => successHandler(res, `Got user of id ${req.params.id}`, user))
    .catch(next);
}

function updateSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().empty(""),
    password: Joi.string().min(6).empty(""),
  });
  validateRequest(req, next, schema);
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body)
    .then((user) => successHandler(res, `Updated user of id ${req.params.id}`, user))
    .catch(next);
}

function _delete(req, res, next) {
  userService
    .delete(req.params.id)
    .then(() => successHandler(res, `Deleted user of id ${req.params.id}`))
    .catch(next);
}
