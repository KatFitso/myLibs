//imports from node_modules
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

//middlewares
require("dotenv").config();
app.use(express.json({ extended: false }));
app.use(cors());
app.use(morgan("short"));

//imports from files
const connectDB = require("./db/db");
connectDB();

//variables
const PORT = process.env.PORT || 3001;

//routing
// app.use("/", (req, res) => res.send("API Running"));
app.use("/api/auth", require("./api/auth"));

//app startup
app.listen(PORT, () => {
  console.log(`Server Listening @ ${PORT}`);
});
