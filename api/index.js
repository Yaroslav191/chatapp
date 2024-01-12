const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

mongoose
   .connect(
      "mongodb+srv://yaroslavv86:I3CBF27VeTTI32ee@cluster0.scwd76n.mongodb.net/",
      { useNewUrlParser: true, useUnifiedTopology: true }
   )
   .then(() => {
      console.log("connected to Mongo DB");
   })
   .catch((err) => {
      console.log("Error connecting to MongoDB", err);
   });

app.listen(port, () => {
   console.log("Server running on port", port);
});

const User = require("./models/user");
const Message = require("./models/message");

//endpoint for registration of the user

app.post("/register", (req, res) => {
   const { name, email, password, image } = req.body;

   //create a new User object
   const newUser = new User({ name, email, password, image });

   //save the user to the database
   new User.save()
      .then(() => {
         res.status(200).json({ message: "User registered successfully" });
      })
      .catch((err) => {
         console.log("Error registrating user", err);
         res.status(500).json({ message: "Error registering the user!" });
      });
});
