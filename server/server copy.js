const express = require("express"); //Line 1
const express = require("express-session");
const mysql = require("mysql");
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "blockbet",
});

connection.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get("/express_backend", (req, res) => {
  //Line 9
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" }); //Line 10
});
