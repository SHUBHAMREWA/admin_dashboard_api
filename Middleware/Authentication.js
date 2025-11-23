
import jwt from "jsonwebtoken";
import { User } from "../Model/User.js";
import bcrypt from "bcryptjs";

export const isAuth = async (req, res, next) => {
  // Prefer custom header first, then Bearer token as fallback
  let token = req.headers.forgotauth;

  const authHeader = req.headers.authorization || "";
  if (!token && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "send code to email First",
      success: false,
    });
  }

  try {
    // Use the same secret that was used in sendOtp
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY_FOROGT_PASS);

    const user = await User.findById(verifyToken.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const verifyCode = await bcrypt.compare(req.body.code, verifyToken.code);

    if (!verifyCode) {
      return res.status(409).json({
        message: "verification failed",
        success: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(409).json({
      message: "verification failed",
      success: false,
    });
  }
};


