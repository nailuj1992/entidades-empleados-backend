const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  res.json({ token });
};

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  const user = new User({ username, password, role });
  await user.save();

  res.status(201).json({ message: "Usuario creado" });
};