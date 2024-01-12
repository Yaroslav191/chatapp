const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
      unique: true,
   },
   password: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   friendsRequests: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   friends: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
   sentFriendsRequests: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
      },
   ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
