const resources = require("../config/resources");

exports.list = async (req, res, next) => {
  try {
    const { model } = resources[req.params.resource];
    const items = await model.find().sort({ createdAt: -1 }).limit(500);
    res.json({ data: items, total: items.length });
  } catch (error) { next(error); }
};

exports.getOne = async (req, res, next) => {
  try {
    const item = await resources[req.params.resource].model.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Record not found" });
    res.json({ data: item });
  } catch (error) { next(error); }
};

exports.create = async (req, res, next) => {
  try {
    const item = await resources[req.params.resource].model.create(req.body);
    res.status(201).json({ message: "Record created successfully", data: item });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const item = await resources[req.params.resource].model.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record updated successfully", data: item });
  } catch (error) { next(error); }
};

exports.remove = async (req, res, next) => {
  try {
    const item = await resources[req.params.resource].model.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Record not found" });
    res.json({ message: "Record deleted successfully" });
  } catch (error) { next(error); }
};
