const express = require("express");
const { getAll, getOne, create, update, remove, health } = require("../controllers/entidadController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getOne);
router.get("/health", health);
router.post("/", authMiddleware, roleMiddleware("admin"), create);
router.put("/:id", authMiddleware, roleMiddleware("admin"), update);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), remove);

module.exports = router;