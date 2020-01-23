const express = require("express");
const app = express();
const PORT = 3000;

let participants = [];
let whonexts = [];

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    "0": "GET    /",
    "1": "POST   /whonext",
    "2": "GET    /whonext",
    "3": "-----------------------",
    "4": "GET    /participants",
    "5": "POST   /participants",
    "6": "GET /participants/:id",
    "7": "PUT /participants/:id",
    "8": "DELETE /participants/:id",
  });
});

app.post("/whonext", (req, res) => {
  if (participants.length > 0) {
    const whonext =
      participants[Math.floor(Math.random() * participants.length)];
    whonexts.push(whonext);
    res.status(201).json([whonext]);
  } else {
    const statusCode = 500;
    res.status(statusCode).json({
      errors: {
        statusCode: "No participants to be next!",
      },
    });
  }
});

app.get("/participants", (req, res) => {
  res.json(participants);
});

app.post("/participants", (req, res) => {
  const participant = req.body;
  participants.push(participant);
  res.json([participant]);
});

const server = app.listen(PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
