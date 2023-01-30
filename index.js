const express = require("express");
const mysql = require("mysql");

const app = express();

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "12345678",
  database: "nodemysql",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("mysql connected");
});

db.on("error", (err) => {
  console.log("mysql error", err);
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";

  db.query(sql, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  res.send("Database created");
});

app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    throw err;
  });
  res.send("Employee table created");
});

app.get("/employee1", (req, res) => {
  let post = { name: "Jake Smith", designation: "Chief Executive Officer" };

  let sql = "INSERT INTO employee SET ?";

  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }

    res.send("Employee 1 added");
  });
});

app.get("/updateemployee/:id", (req, res) => {
  let newName = "Updated name";

  let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Post updated...");
  });
});

app.get("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;

  let query = db.query(sql, (err) => {
    if (err) {
      throw err;
    }

    res.send("Employee deleted");
  });
});

app.listen(4000, (req, res) => {
  console.log("Serve running on port 4000");
});
