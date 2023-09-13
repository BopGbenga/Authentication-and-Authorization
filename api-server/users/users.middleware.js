const checkBody = (req, res, next) => {
  if (!req.body.username) {
    return res.status(401).json({
      message: "username is required",
    });
  }

  if (!req.body.password) {
    return res.status(401).json({ message: "password is required" });
  }

  next();
};

module.exports = { checkBody };
