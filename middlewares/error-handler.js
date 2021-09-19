module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  switch (true) {
    case typeof err === "string":
      // custom application error
      if(err === "Unauthorized") {
        return res.status(401).json({ status: "Error", message: err });
      }
      const is404 = err.toLowerCase().endsWith("not found");
      const statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ status: "Error", message: err });
    case err.name === "UnauthorizedError":
      // jwt authentication error
      return res.status(401).json({ status: "Error", message: "Unauthorized" });
    default:
      return res.status(500).json({ status: "Error", message: err.message });
  }
}
