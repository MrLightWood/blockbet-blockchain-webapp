const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../helpers/db");
const config = require("../server/config");
const uuid = require("uuid");
const wallet = require("../helpers/wallet");

module.exports = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function authenticate({ email, password }) {
  const user = await db.User.scope("withHash").findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    throw "Email or password is incorrect";

  // authentication successful
  const token = jwt.sign({ id: user.id, address: user.address }, config.jwt_secret, {
    expiresIn: "7d",
  });

  return token;
}

async function getAll() {
  return await db.User.findAll();
}

async function getById(id) {
  return await getUser(id);
}

async function create(params) {
  // validate
  if (await db.User.findOne({ where: { email: params.email } })) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password
  if (params.password) {
    params.passwordHash = await bcrypt.hash(params.password, 10);
  }

  params.id = uuid.v4();

  let walletId = await db.User.max("walletId");
  if(isNaN(walletId)) {
    walletId = 0;
  } else {
    walletId++;
  }
  
  params.walletId = walletId;
  params.address = wallet.getAddress(walletId);
  params.public_key = wallet.getPublicKey(walletId);
  params.private_key = wallet.getPrivateKey(walletId);
  // save user
  const res = await db.User.create(params);
  return res;
}

async function update(id, params) {
  const user = await getUser(id);

  // validate
  const emailChanged = params.email && user.email !== params.email;
  if (
    emailChanged &&
    (await db.User.findOne({ where: { email: params.email } }))
  ) {
    throw 'Email "' + params.email + '" is already taken';
  }

  // hash password if it was entered
  if (params.password) {
    params.hash = await bcrypt.hash(params.password, 10);
  }

  // copy params to user and save
  Object.assign(user, params);
  await user.save();

  return omitHash(user.get());
}

async function _delete(id) {
  const user = await getUser(id);
  await user.destroy();
}

// helper functions

async function getUser(id) {
  const user = await db.User.findByPk(id, {attributes: ['id', 'email', 'address', 'public_key']});
  if (!user) throw "User not found";
  return user;
}

function omitHash(user) {
  const { hash, ...userWithoutHash } = user;
  return userWithoutHash;
}
