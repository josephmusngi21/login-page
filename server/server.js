const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Define  database name
const dbName = "nodeserver";

const saltRounds = 10;

let db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: dbName,
});

db.connect((err) => {
  if (err) {
    console.log(
      "Unable to connect to the specified database. Creating the database instead."
    );
    db = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
    });

    db.connect((err) => {
      if (err) throw err;
      console.log("Connected to the default database.");

      db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err, result) => {
        if (err) throw err;
        console.log(`Database ${dbName} created`);
      });
    });
  } else {
    console.log(`Connected to the ${dbName} database.`);
  }

  let sql =
    "CREATE TABLE IF NOT EXISTS user(id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log("User table created");
  });
});

//create database //! dont need cause it should have made it already
app.get("/createdb", (req, res) => {
  let sql = `CREATE DATABASE ${dbName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database created");
  });
});

//create table //! dont need this, incorporated already
app.get("/createposttable", (req, res) => {
  let sql =
    "CREATE TABLE user(id int AUTO_INCREMENT, email VARCHAR(255), password VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post table created");
  });
});

// Insert post
app.get("/addpost/:email/:password", (req, res) => {
  bcrypt.hash(req.params.password, saltRounds, function (err, hash) {
    let post = { email: req.params.email, password: hash };
    let sql = "INSERT INTO user SET ?";
    let query = db.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send(`User added with email: ${req.params.email}`);
    });
  });
});

//select post
app.get("/getpost/:id", (req, res) => {
  let sql = `SELECT * FROM user WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`User ${req.params.id} fetched`);
  });
});

//update post
app.get("/updateemail/:id/:updatedemail", (req, res) => {
  let sql = `UPDATE user SET email='${req.params.updatedemail}' WHERE id=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Updated ${req.params.id} with email ${req.params.updatedemail}`);
  });
});

//update post
app.get("/updatepassword/:id/:updatepassword", (req, res) => {
  bcrypt.hash(req.params.updatepassword, saltRounds, function (err, hash) {
    let sql = `UPDATE user SET password='${hash}' WHERE id=${req.params.id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`Updated ${req.params.id} with new password`);
    });
  });
});

//delete post
app.get("/deletepost/:type/:id", (req, res) => {
  let sql = `DELETE FROM user WHERE ${req.params.type}=${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`user ${req.params.id} deleted`);
  });
});

//get all post
app.get("/getallposts", (req, res) => {
  let sql = "SELECT * FROM user";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(`The size of the data\n${results.length}`);
  });
});

// drop table
app.get("/droptable/:table", (req, res) => {
  let sql = `DROP TABLE ${req.params.table}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Table ${req.params.table} deleted`);
  });
});

//requests to delete db
app.get("/requestdbdelete", (req, res) => {
  res.send(
    `Are you sure you want to delete the database ${dbName}? If yes, go to /confirmdbdelete`
  );
});

//confirm to delete
app.get("/confirmdbdelete", (req, res) => {
  let sql = `DROP DATABASE ${dbName}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`Database ${dbName} deleted`);
  });
});

//checks existing email
app.get("/checkEmail/:email", (req, res) => {
  const decodedEmail = decodeURIComponent(req.params.email);
  let sql = `SELECT * FROM user WHERE email='${decodedEmail}'`;
  db.query(sql, (err, results) => {
    if (err) throw err;
    console.log("Email check result:", results);
    res.json({ exists: results.length > 0 });
  });
});

//!EXTRAS
// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  console.log(`salt: ${salt}, hash: ${hash}`);
  let sql = `SELECT * FROM user WHERE email='${email}'`;
  db.query(sql, async (err, results) => {
    console.log('Query executed');
    if (err) {
      console.log('Database error:', err);
    }
    if (results.length > 0) {
      console.log('User found:', results[0]);
      try {
        const match = await bcrypt.compare(password, results[0].password);
        console.log('Password comparison result:', match);
        if (match) {
          res.send(`User ${email} logged in successfully`);
        } else {
          res.send('Incorrect password');
        }
      } catch (bcryptError) {
        console.log('Bcrypt error:', bcryptError);
        res.status(500).send('Server error');
      }
    } else {
      console.log('User not found');
      res.send('Email not found');
    }
  });
});




//checking if server is still open
app.listen(4000, () => {
  console.log("Server is successful on port 4000");
});
