const express = require("express");
const { getOne, remove, health } = require("../controllers/empleadoController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/:id", getOne);
router.get("/health", health);
router.put("/:id", authMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), remove);

module.exports = router;