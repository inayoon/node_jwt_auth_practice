import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const salt = 10;

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

const db = mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "signup",
});

app.post("/register", (req, res) => {
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({ Error: "Error for hashing password" });
    const values = [req.body.name, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ Error: "Inserting data failed" });
      return res.json({ Status: "Success" });
    });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM login WHERE email =?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({ Error: "Login error in server" });
    if (data.length > 0) {
      bcrypt.compare(
        req.body.password.toString(),
        data[0].password,
        (err, response) => {
          if (err) return res.json({ Error: "Password mismatch" });
          if (response) {
            return res.json({ Status: "Success" });
          } else {
            return res.json({ Error: "Password mismatch" });
          }
        }
      );
    } else {
      return res.json({ Error: "No email founded" });
    }
  });
});

app.listen(8800, () => {
  console.log("Running. .. . ");
});
