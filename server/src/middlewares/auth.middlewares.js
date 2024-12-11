import jwt from "jsonwebtoken";

// Verify JWT Token
const verifyToken = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw err; // Propagate the error for specific handling
  }
};

// Authentication Middleware
const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication header missing or malformed",
    });
  }

  // Extract the token from the Authorization header
  const token = authHeader.split(" ")[1];

  try {
    // Verify the token
    const payload = verifyToken(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = payload;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle specific JWT errors
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token has expired. Please login again.",
      });
    }
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token. Authentication failed.",
      });
    }

    // Handle other errors
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export { authenticateUser };
