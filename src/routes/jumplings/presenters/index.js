const express = require("express");
const router = express.Router();

let presenters = [];

router.post("/", (req, res) => {
  jumplings = req.jumplings;
  if (jumplings.length > 0) {
    const presenter = jumplings[Math.floor(Math.random() * jumplings.length)];
    presenters.push(presenter);
    res.status(201).json([presenter]);
  } else {
    const statusCode = 500;
    res.status(statusCode).json({
      errors: {
        statusCode: "No jumplings to be next!",
      },
    });
  }
});

router.get("/", (req, res) => {
  res.json(presenters);
});

module.exports = router;
