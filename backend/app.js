//Créer un fichier app.js générique pour une API node.js

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const PORT = 8080;

dotenv.config();

//app.use(cors({ origin: "*" }))

app.use(cors({ origin: "http://localhost:3000" }))

mongoose
  .connect("mongodb://localhost:27017/tp", {})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
  });

app.use("/users", require("./Routes/UserRoutes"));
app.use("/annonces", require("./Routes/AnnonceRoutes"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


