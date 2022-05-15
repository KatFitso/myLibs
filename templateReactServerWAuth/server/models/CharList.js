const mongoose = require("mongoose");

const CharListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  chars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Char",
    },
  ],
});

module.exports = mongoose.model("CharList", CharListSchema);
