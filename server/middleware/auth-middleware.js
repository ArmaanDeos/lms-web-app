const jwt = require("jsonwebtoken");

const verifyToken = (token, secretKey) => {
  return jwt.verify(token, secretKey);
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("Authorization Header:", authHeader); // Log the header to check its content

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header is missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing from the authorization header",
    });
  }

  try {
    const payload = verifyToken(token, "JWT_SECRET");

    req.user = payload;

    next();
  } catch (e) {
    console.error("Error verifying token:", e);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

module.exports = authenticate;
