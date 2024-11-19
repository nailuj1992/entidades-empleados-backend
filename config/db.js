const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
      .then(() => console.log("Conectado a MongoDB Atlas"))
      .catch((err) => console.error("Error al conectar a MongoDB", err));
    console.log("MongoDB conectado...");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;