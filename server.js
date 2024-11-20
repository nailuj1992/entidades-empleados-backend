require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const entidadRoutes = require("./routes/entidadRoutes");

const app = express();
connectDB();

// Habilitar CORS para todas las solicitudes
app.use(cors());  // Esto permite CORS para todos los orígenes

app.use(express.json());
app.get("/", (req, res) => {
    res.send("API funcionando en Vercel");
});
app.use("/api/entidades", entidadRoutes);
app.use("/api/auth", authRoutes);

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
module.exports = app;