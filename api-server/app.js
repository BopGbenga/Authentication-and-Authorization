const express = require("express");

const userRoute = require("./users/users.routers");
const itemsRouter = require("./routes/items.js");

const app = express();
const PORT = 5000;

app.use("/users", userRoute);
app.use("/items", itemsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
