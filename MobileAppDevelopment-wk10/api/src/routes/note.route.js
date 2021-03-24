const express = require("express");
const app = express();
const noteRoute = express.Router();

let NoteModel = require("../model/Note");

// add
noteRoute.post("/add", (req, res) => {
  const note = new NoteModel(req.body);
  note
    .save()
    .then(res.redirect("/note"))
    .catch((err) => console.log(err));
});

// Find all
noteRoute.get("/", (req, res) => {
  NoteModel.find()
    .sort({ createdAt: -1 })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

// Find by id
noteRoute.get("/:id", (req, res) => {
  const id = req.params.id;

  NoteModel.findById(id)
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
});

// Update by id
// noteRoute.put("/:id", (req, res) => {
//   const id = req.params.id;
//   const editedNote = new NoteModel(req.body);

//   NoteModel.findByIdAndUpdate(id, { note: editedNote })
//     .then(res.redirect("/note"))
//     .catch((err) => console.log(err));
// });

// Delete by id
noteRoute.delete("/:id", (req, res) => {
  const id = req.params.id;

  NoteModel.findByIdAndDelete(id)
    .then(res.redirect("/note"))
    .catch((err) => console.log(err));
});

module.exports = noteRoute;
