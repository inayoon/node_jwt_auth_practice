import express from "express";
import mysql2 from "mysql2";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

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

app.listen(8081, () => {
  console.log("Running. .. . ");
});
