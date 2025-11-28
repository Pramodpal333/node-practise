import jwt from "jsonwebtoken";

///Check if User is logged in or not
export const authorizeMiddleware = (req, res, next) => {
  try {
    const sessionId = req.headers["authorization"];

    if (!sessionId) {
      return next();
    }

    if (!sessionId.includes("Bearer")) {
      return res.status(400).json({ error: "Token does not contains Bearer" });
    }

    const token = sessionId.split(" ")[1];

    const data = jwt.verify(token, process.env.JWT_SECRET);
    console.log("This is the data in Middleware", data);
    req.user = data;
    return next();
  } catch (e) {
    console.log("Auth Failed Error: ", e.toString());
    return next();
  }
};

export const verifyLoginMiddleware = (req, res, next) => {
  const user = req.user;
  console.log("User in verifyLoginMiddleware ------------->", user);
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid Token! Please Login to access this route",
    });
  }

  return next();
};

export const restrictedRoleAccess = (role) => {
  return (req, res, next) => {
    if (req.user.role != role) {
      return res.status(401).json({
        success: true,
        message: "Your are unauthorized to access this feature",
      });
    }

    return next();
  };
};
