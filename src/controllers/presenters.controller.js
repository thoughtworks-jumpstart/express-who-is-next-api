const createOne = async (req, res, next) => {
  jumplings = req.jumplings;
  presenters = req.presenters;

  if (jumplings.length > 0) {
    const presenter = jumplings[Math.floor(Math.random() * jumplings.length)];
    presenters.push(presenter);
    res.status(201).json([presenter]);
  } else {
    const err = new Error("Bad Request: No jumplings to be next!");
    err.code = 400;
    next(err);
  }
};

module.exports = { createOne };
