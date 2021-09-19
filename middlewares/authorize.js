const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../server/config");
const errorHandler = require("../middlewares/error-handler");

module.exports = authorize;

function authorize(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    if(req.params.onlyStatus) {
      return res.status(200).json({status: "Error", message: "Unauthorized"});
    }
    return errorHandler("Unauthorized", req, res, next);
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = { id: data.id, address: data.address };
    return next();
  } catch (error){
    return errorHandler(error, req, res, next);
  }
}
