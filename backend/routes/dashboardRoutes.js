const express = require("express");
const resources = require("../config/resources");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const counts = {};
    await Promise.all(Object.entries(resources).map(async ([key, value]) => {
      counts[key] = await value.model.countDocuments();
    }));
    const recent = await Promise.all(
      ["students", "staff", "courses", "notices"].map(async key => ({
        key,
        items: await resources[key].model.find().sort({ createdAt: -1 }).limit(4).lean()
      }))
    );
    res.json({ counts, recent, totalRecords: Object.values(counts).reduce((a, b) => a + b, 0) });
  } catch (error) { next(error); }
});

module.exports = router;
