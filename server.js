require("dotenv").config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const entidadRoutes = require("./routes/entidadRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");

const app = express();
connectDB();

// Habilitar CORS para todas las solicitudes
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.options("*", cors());

app.use(express.json());
app.get("/", (req, res) => {
    res.send("API funcionando en Vercel");
});
app.use("/api/entidades", entidadRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/auth", authRoutes);

//const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
module.exports = app;