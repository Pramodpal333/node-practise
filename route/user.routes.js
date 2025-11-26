import express from "express";
import db from "../db/index.js";
import { userSessionsTable, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "crypto";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("User route is working");
  return res.json({ message: "User route is working" });
});

router.post("/sign-up", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db.select({
    email: usersTable.email
  }).from(usersTable).where((e) => eq(e.email, email));

  if (existingUser) {
    return res.status(400).json({ error: `User exist with email ${email}` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

  const [user] = await db.insert(usersTable).values({
    name, email, password: hashedPassword, salt
  }).returning({ id: usersTable.id });

  return res.status(201).json({ success: true, message: "New user Created", id: user.id });
});

router.post("/login", async (req, res) => {

  //Recieved data from request
  const {email,password} = req.body;

  /// Query if user exist
    const [existingUser] = await db.select()
    .from(usersTable).where((e) => eq(e.email, email));

    ///If user does not exist
  if(!existingUser){
    return res.status(404).json({success:false,message:'User does not exist with the mail',email});
  }

  ///Get salt of exisiting user
const salt = existingUser.salt;

///Get Hashesh password
const storedHashedPassword = existingUser.password;

///Create a new hashed from the password recieved from request
const newHashedPassword = createHmac("sha256",salt).update(password).digest("hex");

///comare stored hashed password and the new hashed password created from password received from request
if(newHashedPassword !== storedHashedPassword){
  return res.status(400).json({success: false,message: 'Incorrect Password'});
}

/// This will create a session Stroing in DB 
const [session] = await db.insert(userSessionsTable).values({userId: existingUser.id}).returning({id: userSessionsTable.id});

return res.status(200).json({success:true,token: session.id,});

});

export default router;
