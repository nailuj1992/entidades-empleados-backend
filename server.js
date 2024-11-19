require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const entidadRoutes = require("./routes/entidadRoutes");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/entidades", entidadRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));