const express = require("express");
const app = express(),
  bodyParser = require("body-parser");
port = 3080;
const cors = require("cors");
const database = require("./db/db");

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(process.cwd() + "/lms/dist/lms/"));

app.get("/api/courses", (req, res) => {
  res.json(database.courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id || null;
  const result = database.courseDetailed.filter((course) => course.id.toString() === id)[0];
  res.json(result);
});

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/lms/dist/lms/index.html");
});

app.get("^/courses**$", (req, res) => {
  res.sendFile(process.cwd() + "/lms/dist/lms/index.html");
});

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
