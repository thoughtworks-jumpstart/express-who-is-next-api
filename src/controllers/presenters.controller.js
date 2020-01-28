const createOne = async (req, res, next) => {
  jumplings = req.jumplings;
  presenters = req.presenters;

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
};

module.exports = { createOne };
