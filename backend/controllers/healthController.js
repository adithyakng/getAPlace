const healthController = {};
healthController.index = (req, res) => {
  console.log("hello");
  return res.json({
    status: "Success",
    message: "Service is healthy",
  });
};

module.exports = healthController;
