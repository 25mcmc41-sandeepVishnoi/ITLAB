const express = require("express");
const router = express.Router();
const db = require("../db");


// ✅ GET users with pagination
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;

  db.query("SELECT * FROM users LIMIT ? OFFSET ?", [limit, offset], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});


// ✅ CREATE user
router.post("/", (req, res) => {
  const { name, email, age } = req.body;

  db.query(
    "INSERT INTO users (name, email, age) VALUES (?, ?, ?)",
    [name, email, age],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});


// ✅ UPDATE user
router.put("/:id", (req, res) => {
  const { name, email, age } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE users SET name=?, email=?, age=? WHERE id=?",
    [name, email, age, id],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json(result);
    }
  );
});


// ✅ DELETE user
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

module.exports = router;