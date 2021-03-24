const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let NoteSchema = new Schema(
  {
    note: {
      type: String,
      required: true
    },
  },
  {
    collection: "notes",
  },
  { timestamp: true }
);

module.exports = mongoose.model("Note", NoteSchema);
