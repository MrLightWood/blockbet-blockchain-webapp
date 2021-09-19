require("rootpath")();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("../middlewares/error-handler");
const config = require("./config");
const cookieParser = require("cookie-parser");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

// api routes
app.use("/users", require("../controllers/user.controller"));
app.use("/api", require("../controllers/blockbet.controller"));

app.get("/express_backend", (req, res) => {
  res
    .cookie("userId", 1000, {
      expires: new Date(Date.now() + 60),
      maxAge: 3600,
      httpOnly: true,
      sameSite: false,
      secure: false,
    })
    .send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

// global error handler
app.use(errorHandler);

// start server
const port = config.node_env === "production" ? config.port || 80 : 5000;
app.listen(port, () => console.log("Server listening on port " + port));
