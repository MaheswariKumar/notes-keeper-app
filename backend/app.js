const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/util/lib/mongodb");
const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");

app.use(cors());

app.use(express.json());

connectDB();

app.use(authRoutes);
app.use(notesRoutes);

module.exports = app;