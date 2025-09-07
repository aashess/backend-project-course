import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from 'dotenv';
dotenv.config();


const router = express.Router();

const data = []

router.post("/register", (req, res) => {
  const { username, password } = req.body;
  // save admin@gmail.com || password: 123456789
  console.log(username, password);
  // hash a password
  const hashPassword = bcrypt.hashSync(password);

  
    // save the new user and hashed password to db.
try {
        const insertUser = db.prepare(`INSERT INTO user (username, password) VALUES (?,?)`) // quary-execution. 

        const result = insertUser.run(username, hashPassword) // username - password passed. 

        // create a by default to-do to every user that register for first time. 
        const defaultTodo = `HELLO :) Add your first ToDo!`
        const insertTodo = db.prepare(`INSERT INTO todo (user_id , task ) VALUES (? , ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

            // console.log(result);
            
        // create a token
        const token = jwt.sign({id: result.lastInsertRowid,username: username}, process.env.JWT_SECRET, {expiresIn: '24h'} )
        res.json({ token })

} catch (err) {
    
    console.log(err.message)

    res.sendStatus(503)
}



//   console.log(hashPassword);

//   data.push(username,password)

//   res.send(`
//         ${data}
//     `);
});

router.post("/login", (req, res) => {});

export default router;
