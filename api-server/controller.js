const fs = require("fs");
const path = require("path");

const itemsDbpath = path.join(__dirname, "db", "items.json");

const getAllItems = (req, res) => {
  fs.readFile(itemsDbpath, (err, items) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "An error occured" });
    }
    res.json(JSON.parse(items));
  });
};
const getAnItem = (req, res) => {
  fs.readFile(itemsDbpath, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "An error occured" });
    }

    const items = JSON.parse(data);

    const id = req.params.id;

    const foundItem = items.find((items) => {
      return items.id == parseInt(id);
    });

    if (!foundItem) {
      res.status(404).send("item not found");
    }
    res.status(200).json(foundItem);
  });
};
//post
const addItem = (req, res) => {
  const newItem = req.body;

  fs.readFile(itemsDbpath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "An error occurred" });
    }
    const items = JSON.parse(data);

    const lastId = items[items.length - 1].id;
    const newId = lastId + 1;

    const postWithId = { ...newItem, id: newId };
    items.push(postWithId);

    fs.writeFile(itemsDbpath, JSON.stringify(items), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error. Could not save item to database.",
        });
      }

      res.json(newItem);
    });
  });
};
//Put
const updateItem = (req, res) => {
  fs.readFile(itemsDbpath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ message: "An error occurred" });
    }
    const items = JSON.parse(data);

    const update = req.body;
    const id = req.params.id;

    const itemIndex = items.findIndex((item) => item.id === parseInt(id));

    if (itemIndex == -1) {
      res.status(404);
      res.end("id not found");
    }
    items[itemIndex] = { ...items[itemIndex], ...update };

    fs.writeFile(itemsDbpath, JSON.stringify(items), (err) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          message: "Internal Server Error. Could not update item in database.",
        });
      }
      res.json(items);
    });
  });
};
//Delete
const deleteItem = (req, res) => {
  fs.readFile(itemsDbpath, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).JSON({ message: "An error occured" });
    }

    const items = JSON.parse(data);
    const id = req.params.id;

    const itemIndex = items.findIndex((item) => item.id === parseInt(id));

    if (itemIndex == -1) {
      res.status(404).send(`item with ${id} not found`);
    }
    items.splice(itemIndex, 1);
    fs.writeFile(itemsDbpath, JSON.stringify(items), (err) => {
      if (err) {
        console.log(err);
        res.status(500).send(`items at id: ${id} successfully deleted`);
      }
      res.json(items);
    });
  });
};

module.exports = { getAllItems, getAnItem, addItem, updateItem, deleteItem };
