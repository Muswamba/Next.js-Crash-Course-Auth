import jwt from "jsonwebtoken";
// Generate and verify JWT
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

const JWT_SECRET = process.env.JWT_SECRET || ""; // Replace with a strong secret key

export const generateToken = (id: string): string => {
   return jwt.sign({ id }, JWT_SECRET, { expiresIn: "600h" });
};

export const verifyToken = (token: string): any => {
   return jwt.verify(token, JWT_SECRET);
};
