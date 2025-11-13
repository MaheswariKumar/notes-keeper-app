const express = require("express");
const router = express.Router();

const notesControllers = require("../controllers/notesControllers");
const middlewares = require("../middlewares/authMiddlewares");

router.post("/api/v1/createnotes", middlewares.verifyToken, notesControllers.createNotes);
router.get("/api/v1/getsavednotes", middlewares.verifyToken, notesControllers.getSavesNotes);
router.patch("/api/v1/editnotes/:id", middlewares.verifyToken, notesControllers.editNotes);
router.delete("/api/v1/deletenotes/:id", middlewares.verifyToken, notesControllers.deleteNotes);

module.exports = router;