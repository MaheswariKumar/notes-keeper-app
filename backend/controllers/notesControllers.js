const { default: mongoose } = require("mongoose");
const Note = require("../model/Notes");

const createNotes = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "update something for creating notes",
      });
    }

    if (!req.body.content) {
      return res.status(400).json({
        message: "notes updation required",
      });
    }

    const newNotes = await Note.create({
      content: req.body.content,
      userId: req.userId,
    });

    return res.status(201).json({
      message: "notes created successfully",
      notes: newNotes,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getSavesNotes = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        message: "User Unauthorized",
      });
    }

    const savednotes = await Note.find({ userId: req.userId });

    return res.status(200).json({
      message: "saved notes fetched successfully",
      notes: savednotes || [],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const editNotes = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({
        message: "notes is required to edit",
      });
    }

    const { content } = req.body;
    const { id } = req.params;

    if (!content || !id) {
      return res.status(400).json({
        message: "notes is required to edit",
      });
    }

    const noteInfo = await Note.findById(id);

    if (!noteInfo) {
      return res.status(404).json({
        message: "notes not found with a given id",
      });
    }

    const newNote = await Note.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    return res.status(200).json({
      message: "Edited Successfully",
      newNote: newNote,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const deleteNotes = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Need Id for delete notes",
      });
    }

    const noteInfo = await Note.findById(id);

    if (!noteInfo) {
      return res.status(404).json({
        message: "Not found any note info with a given ID",
      });
    }

    await Note.deleteOne({ _id: id });

    return res.status(200).json({
      message: "Deleted note Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createNotes,
  getSavesNotes,
  editNotes,
  deleteNotes,
};
