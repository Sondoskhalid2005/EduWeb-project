const jwt = require("jsonwebtoken");
const mongoose=require("mongoose")
const authController=require("../controllers/auth.controller")

const authMiddleware = (req, res, next) => {
const authHeader = req.headers.authorization || req.headers.Authorization;
const token = authHeader?.split(" ")[1];
  
  // Check if token is missing, blacklisted, or not the current active token
  if (!token|| authController.tokenStore.blacklist.includes(token) || authController.tokenStore.currentToken!==token ) // check if token in blacklist(means loged out) and prevent another active calling work
    
  return res.status(401).json({ msg: "No token provided , sign in please !" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
   req.user = decoded;
   req.user.id=new mongoose.Types.ObjectId(req.user.id)
   
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};


module.exports = {authMiddleware};
