import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import { authenticateUser } from "../middlewares/auth.middlewares.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/check-auth", authenticateUser, (req, res) => {
  const user = req.user;

  return res.status(200).json({
    success: true,
    message: "User is authenticated successfully",
    data: {
      user,
    },
  });
});

export default router;
