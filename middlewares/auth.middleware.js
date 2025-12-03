import express from "express";
import jwt from "jsonwebtoken";

export const authorizeMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];

    if (!authorization.includes("Bearer")) {
      return res.status(400).json({ error: "Please add Bearer in the token" });
    }

    const token = authorization.split(" ")[1];

    console.log(token);
    const data = jwt.verify(token, process.env.JWT_SECRET);

    req.user = data;
    return next();
  } catch (e) {
    console.log("Error is ", e);
    return next();
  }
};

export const verifyLoginMiddeware = async (req, res, next) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ error: "Please Login to access this route" });
  }
  return next();
};
