const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    info: {
      type: String,
      required: true,
    },
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      pic: { type: String, default: null },
      author: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const blogModal = mongoose.model("Blog", blogSchema);

module.exports = blogModal;
