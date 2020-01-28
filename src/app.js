const express = require("express");
const app = express();

app.use(express.json());

const jumplingsRouter = require("./routes/jumplings");
app.use("/jumplings", jumplingsRouter);

app.get("/", (req, res) => {
  res.json({
    "0": "GET    /",
    "1": "POST   /jumplings/presenters",
    "2": "GET    /jumplings/presenters",
    "3": "-----------------------",
    "4": "GET    /jumplings",
    "5": "POST   /jumplings",
    "6": "GET /jumplings/:id",
    "7": "PUT /jumplings/:id",
    "8": "DELETE /jumplings/:id",
  });
});

module.exports = app;
