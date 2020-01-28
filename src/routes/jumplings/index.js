const express = require("express");
const router = express.Router();

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
    res.status(400).send("Server wants application/json!");
  } else {
    next();
  }
};

router.post("/", requireJsonContent, (req, res) => {
  const jumpling = req.body;
  // need validation here
  jumplings.push(jumpling);
  res.json([jumpling]);
});

router.get("/:id", (req, res) => {
  const jumpling = req.jumpling;
  if (jumpling) {
    res.json(jumpling);
  } else {
    res.status(404).json({
      errors: {
        404: "No jumpling of such id found!",
      },
    });
  }
});

router.put("/:id", requireJsonContent, (req, res) => {
  const index = req.index;
  if (index >= 0) {
    // need validation here
    const jumpling = req.body;
    jumplings[index] = jumpling;
    res.json(jumpling);
  } else {
    res.status(404).json({
      errors: {
        404: "No jumpling of such id found!",
      },
    });
  }
});

router.delete("/", (req, res) => {
  jumplings.splice(0, jumplings.length);
  res.json(jumplings);
});

router.delete("/:id", (req, res) => {
  const index = req.index;
  if (index >= 0) {
    const removedJumpling = jumplings[index];
    jumplings.splice(index, 1);
    res.json(removedJumpling);
  } else {
    res.status(404).json({
      errors: {
        404: "No jumpling of such id found!",
      },
    });
  }
});

module.exports = router;
