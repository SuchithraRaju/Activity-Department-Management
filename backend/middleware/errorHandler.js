module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: Object.values(err.errors).map(e => e.message).join(", ") });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: "A record with this unique value already exists." });
  }
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid record ID or field value." });
  }
  res.status(500).json({ message: "Server error. Please try again." });
};
