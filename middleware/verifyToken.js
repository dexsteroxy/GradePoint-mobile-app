// middleware/verifyToken.js
import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  // Check Authorization header first
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || req.cookies.token;

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized: No token provided" 
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // Ensure this matches your token payload
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      message: "Unauthorized: Invalid token" 
    });
  }
};

export default verifyToken;