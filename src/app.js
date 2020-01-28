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

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.code || 500);
  if (err.code) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});

module.exports = app;
