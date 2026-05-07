import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

const generateToken = (username: string) => {
  return jwt.sign({ username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

// Verify a JWT token
const verifyToken = (token: string) => {
  return jwt.verify(token, SECRET_KEY) as { username: string };
};

export { verifyToken, generateToken };