const express = require("express");
const controller = require("../controllers/resourceController");
const resources = require("../config/resources");
const router = express.Router();

router.param("resource", (req, res, next, resource) => {
  if (!resources[resource]) return res.status(404).json({ message: "Unknown resource" });
  next();
});

router.get("/:resource", controller.list);
router.post("/:resource", controller.create);
router.get("/:resource/:id", controller.getOne);
router.put("/:resource/:id", controller.update);
router.delete("/:resource/:id", controller.remove);

module.exports = router;
