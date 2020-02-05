const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");

let jumplings = [];

const presenterRouter = require("./presenters");
router.use(
  "/presenters",
  (req, res, next) => {
    req.jumplings = jumplings;
    next();
  },
  presenterRouter
);

const validateJumpling = jumpling => {
  const schema = Joi.object({
    id: Joi.number()
      .integer()
      .required(),
    name: Joi.string()
      .min(3)
      .required(),
  });
  return schema.validate(jumpling);
};

router.param("id", (req, res, next, id) => {
  const idInt = parseInt(id);
  const jumpling = jumplings.find(p => {
    return p.id === idInt;
  });
  req.jumpling = jumpling;

  const index = jumplings.map(p => p.id).indexOf(idInt); // or use findIndex
  req.index = index;

  next();
});

router.get("/", (req, res) => {
  res.json(jumplings);
});

const requireJsonContent = (req, res, next) => {
  if (req.headers["content-type"] !== "application/json") {
    const err = new Error("Server wants application/json!");
    err.code = 400;
    next(err);
  } else {
    next();
  }
};

router.post("/", requireJsonContent, (req, res, next) => {
  const jumpling = req.body;
  const validation = validateJumpling(jumpling);
  if (validation.error) {
    const err = new Error(validation.error.details[0].message);
    err.code = 400;
    return next(err);
  }
  jumplings.push(jumpling);
  res.json([jumpling]);
});

router.get("/:id", (req, res, next) => {
  const jumpling = req.jumpling;
  if (jumpling) {
    res.json(jumpling);
  } else {
    const err = new Error("Not Found: No jumpling of such id found!");
    err.code = 404;
    next(err);
  }
});

router.put("/:id", requireJsonContent, (req, res, next) => {
  const index = req.index;
  if (index >= 0) {
    const jumpling = req.body;
    const validation = validateJumpling(jumpling);
    if (validation.error) {
      const err = new Error(validation.error.details[0].message);
      err.code = 400;
      return next(err);
    }
    jumplings[index] = jumpling;
    res.json(jumpling);
  } else {
    const err = new Error("Not Found: No jumpling of such id found!");
    err.code = 404;
    next(err);
  }
});

router.delete("/", (req, res) => {
  jumplings.splice(0, jumplings.length);
  res.json(jumplings);
});

router.delete("/:id", (req, res, next) => {
  const index = req.index;
  if (index >= 0) {
    const removedJumpling = jumplings[index];
    jumplings.splice(index, 1);
    res.json(removedJumpling);
  } else {
    let err = new Error("Not Found: No jumpling of such id found!");
    err.code = 404;
    next(err);
  }
});

module.exports = router;
