const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOption));

app.use(express.json());

//app.use(express.urlencoded({ extended: true}));

app.get("/", (req, res) => {
    res.json({ message: "Sending json from uber eats welcome page"});
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});

const mysql = require("mysql");


