import jwt from "jsonwebtoken";

export const verifyUser = (req, res) => {
    
  const token = req.params.token;

  try {
    const verify = jwt.verify(token, process.env.SECRET_KEY_LOGIN);

    // ✅ Agar token valid hai
    return res.status(200).json({
      message: "Token is valid",
      data: verify
    });

  } catch (err) {
    // ❌ Agar token invalid ya expired hai
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};
