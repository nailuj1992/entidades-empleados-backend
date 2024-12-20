const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "No autorizado" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, { algorithms: ["HS256"] });
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({ message: "Token inválido o malformado" });
    }
    return res.status(403).json({ message: "No autorizado - Token no válido" });
  }
};