const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connections
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "learner",
});

db.connect((error) => {
  if (error) {
    console.log("error occured while connecting...");
  } else {
    console.log("Connection created with mysql");
  }
});

app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE items(id INT AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, () => {
    try {
      res.send("table created");
    } catch (e) {
      console.log("table create time error", e);
    }
  });
});

app.get("/api/items", (reqm, res) => {
  const sqlQuesy = "SELECT * FROM items";

  db.query(sqlQuesy, (err, result) => {
    try {
      res.send(apiResponse(result));
    } catch (error) {
      console.log("items list error", error);
    }
  });
});

app.get("/api/items/:id", (req, res) => {
  const sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;

  db.query(sqlQuery, (err, result) => {
    try {
      res.send(apiResponse(result));
    } catch (error) {
      console.log("api items get data", error);
    }
  });
});

app.post("/api/items", (req, res) => {
  let data = {
    title: req.body.title,
    body: req.body.body,
    email: req.body.email,
    name: req.body.name,
  };

  let sqlQuery = "INSERT INTO items SET ?";
  db.query(sqlQuery, data, (err, result) => {
    try {
      const newResult = {
        item_id: result.insertId,
        data: {
          id: result.insertId,
          title: data.title,
          body: data.body,
          email: data.email,
          name: data.name,
        },
      };
      res.send(apiResponse(newResult));
    } catch (error) {
      console.log("Create data while error occured", error);
    }
  });
});

app.put("/api/items/:id", (req, res) => {
  let sqlQuery =
    "UPDATE items SET title= '" +
    req.body.title +
    "', body= '" +
    req.body.body +
    "', name='" +
    req.body.name +
    "', email= '" +
    req.body.email +
    "' WHERE id=" +
    req.params.id;

  db.query(sqlQuery, (err, result) => {
    try {
      res.send(apiResponse(result));
    } catch (error) {
      console.log("Update APi error", error);
    }
  });
});

app.delete("/api/items/:id", (req, res) => {
  const sqlQuery = "DELETE FROM items WHERE id=" + req.params.id;

  db.query(sqlQuery, (err, result) => {
    try {
      console.log(result);
      res.send(apiResponse(result));
    } catch (error) {
      console.log("deleted error", error);
    }
  });
});

const apiResponse = (response) => {
  return JSON.stringify({ status: 200, error: null, response: response });
};

app.listen(4000, () => {
  console.log("Server is running on port number 4000");
});
