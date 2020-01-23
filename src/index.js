const express = require("express");
const app = express();
const PORT = 3000;

let participants = [];
let whonexts = [];

app.use(express.json());

const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};

app.param("id", (req, res, next, id) => {
  const idInt = parseInt(id);
  const participant = participants.find(p => {
    return p.id === idInt;
  });
  req.participant = participant;

  const index = participants.map(p => p.id).indexOf(idInt); // or use findIndex
  req.index = index;

  next();
});

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

app.post("/participants", requireJsonContent, (req, res) => {
  const participant = req.body;
  participants.push(participant);
  res.json([participant]);
});

app.get("/participants/:id", (req, res) => {
  const participant = req.participant;
  if (participant) {
    res.json(participant);
  } else {
    res.status(404).json({
      errors: {
        404: "No participant of such id found!",
      },
    });
  }
});

app.put("/participants/:id", requireJsonContent, (req, res) => {
  const index = req.index;
  if (index >= 0) {
    // need validation here
    const participant = req.body;
    participants[index] = participant;
    res.json(participant);
  } else {
    res.status(404).json({
      errors: {
        404: "No participant of such id found!",
      },
    });
  }
});

app.delete("/participants/:id", (req, res) => {
  const index = req.index;
  if (index >= 0) {
    const removedParticipant = participants[index];
    participants.splice(index, 1);
    res.json(removedParticipant);
  } else {
    res.status(404).json({
      errors: {
        404: "No participant of such id found!",
      },
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
