const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send({
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

app.post("whonext", (req, res) => {
  res.send([{ id: 1, name: "xxx" }]);
});

const server = app.listen(PORT, () => {
  console.log(`Express app started on http://localhost:${PORT}`);
});
