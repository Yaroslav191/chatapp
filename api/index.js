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
const multer = require("multer");

//function to create a token for the user
const createToken = (userId) => {
  const payload = {
    userId: userId,
  };

  //generate the token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
};

//endpoint for registration of the user

app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  //create a new User object
  const newUser = new User({ name, email, password, image });

  //save the user to the database

  newUser
    .save()
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registrating user", err);
      res.status(500).json({ message: "Error registering the user!" });
    });
});

//endpoint for loggin in

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(404)
      .json({ message: "Email and the password are required" });
  }

  const user = User.findOne({ email })
    .then((user) => {
      if (!user) {
        //user not found
        return res.status(404).json({ message: "User not found" });
      }

      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid Password" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token });
    })
    .catch((error) => {
      console.log("error in finding the user", error);
      res.status(500).json({ message: "Internal server Error" });
    });
});

//endpoint to access all the users except the user who's is currently logged in
app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;
  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "There is an error" });
    });
});

//endpoint to send a request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recepient's friendRequestArray
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendsRequests: currentUserId },
    });

    //update the sender's sentFriendRequests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendsRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

//endpoint to show all the friend-requests of a particular user
app.get("/requestedFriends/:userId", async (req, res) => {
  const userId = req.params.userId;

  //fetch the user document based on the user id

  User.findById(userId)
    .populate("friendsRequests", "name email image")
    .lean()
    .then((data) => {
      res.status(200).json(data.friendsRequests);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "There is an error" });
    });
});

//endpoint to accept a friend-request of particular person
app.post("/accept", async (req, res) => {
  try {
    const { senderId, recepientId } = req.body;

    console.log(senderId, recepientId);

    //retrieve the documents of sender and the recipient
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recepientId);

    sender.friends.push(recepientId);
    recipient.friends.push(senderId);

    recipient.friendsRequests = recipient.friendsRequests.filter((item) => {
      return item.toString() !== senderId.toString();
    });

    sender.friendsRequests = sender.friendsRequests.filter((item) => {
      return item.toString() !== recipient.toString();
    });

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend Request accepted successfully" });
  } catch (error) {
    console.log(error);
  }
});

//endpoint to access all the friends of the logged in user!
app.get("/accepted-freinds/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );

    const acceptedFriends = user.friends;
    res.json(acceptedFriends);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Configure multer for handling file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Specify the desired destination folder
  },
  filename: function (req, file, cb) {
    // Generate a unique filename for the uploaded file
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

//endpoint to post Messages and store it in the backend

app.post("/messages", upload.single("imageFile"), async (req, res) => {
  try {
    const { senderId, recepientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recepientId,
      messageType,
      messageText,
      timeStamp: new Date(),
      imageUrl: messageType === "image",
    });

    res.status(200)({ message: "Message sent Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//endpoint to get the userDetails to design the chat Room header
app.get("user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    //fetch the user data from the user ID
    const recepientId = await User.findById(userId);

    res.json(recepientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//endpoint to fetch the messages between two users in the chat room
app.get("/messages/:senderId/:recepientId", async (req, res) => {
  try {
    const { senderId, recepientId } = req.params;
    const messages = await Message.findOne({
      $or: [
        { senderId: senderId, recipientId: recepientId },
        {
          senderId: recepientId,
          recepientId: senderId,
        },
      ],
    }).populate("senderId", "_id name");

    res.json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
