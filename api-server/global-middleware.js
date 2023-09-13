const fs = require("fs");

const checkApi_key = (req, res, next) => {
  const userData = fs.readFileSync("./db/users.json");
  const userDb = JSON.parse(userData);

  const apiKey = req.headers.api_key;

  if (!apiKey) {
    return res.status(401).json({
      message: "You are not authenticated, api_key required",
    });
  }

  const foundUser = userDb.find((user) => user.api_key === apiKey);
  if (!foundUser) {
    return res.status(401).json({
      message: "You are not authenticated.",
    });
  }
  next();
};

const checkAdmin = (req, res, next) => {
  const userData = fs.readFileSync("./db/users.json");
  const userDb = JSON.parse(userData);

  const apiKey = req.headers.api_key;

  const foundUser = userDb.find((user) => user.api_key === apiKey);

  if (foundUser.user_type != "admin") {
    return res.status(401).json({ message: "You are not authorized!!" });
  }
  next();
};

module.exports = { checkApi_key, checkAdmin };
