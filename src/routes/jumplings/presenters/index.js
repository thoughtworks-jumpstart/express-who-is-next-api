const express = require("express");
const router = express.Router();
const { createOne } = require("../../../controllers/presenters.controller");

let presenters = [];

router.post(
  "/",
  (req, res, next) => {
    req.presenters = presenters;
    next();
  },
  createOne
);

router.get("/", (req, res) => {
  res.json(presenters);
});

module.exports = router;
