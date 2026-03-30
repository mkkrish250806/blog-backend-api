const express = require("express");
const router = express.Router();
const db = require("../config/db");
const verifyToken = require("../middleware/authMiddleware");


// ================= CREATE BLOG =================
router.post("/create", verifyToken, (req, res) => {

  const { title, content } = req.body;
  const authorId = req.user.id;

  const sql =
    "INSERT INTO blogs (title, content, authorId) VALUES (?, ?, ?)";

  db.query(sql, [title, content, authorId], (err, result) => {

    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Database error" });
    }

    res.json({
      message: "Blog created successfully"
    });
  });
});


// ================= GET ALL BLOGS =================
router.get("/", (req, res) => {

  db.query("SELECT * FROM blogs", (err, results) => {

    if (err) {
      return res.status(500).json({ message: "Database error" });
    }

    res.json(results);
  });
});


// ================= GET SINGLE BLOG =================
router.get("/:id", (req, res) => {

  db.query(
    "SELECT * FROM blogs WHERE id = ?",
    [req.params.id],
    (err, results) => {

      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json(results[0]);
    }
  );
});


// ================= UPDATE BLOG =================
router.put("/:id", verifyToken, (req, res) => {

  const { title, content } = req.body;

  db.query(
    "UPDATE blogs SET title=?, content=? WHERE id=?",
    [title, content, req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Blog updated successfully"
      });
    }
  );
});


// ================= DELETE BLOG =================
router.delete("/:id", verifyToken, (req, res) => {

  db.query(
    "DELETE FROM blogs WHERE id=?",
    [req.params.id],
    (err) => {

      if (err) {
        return res.status(500).json({ message: "Database error" });
      }

      res.json({
        message: "Blog deleted successfully"
      });
    }
  );
});

module.exports = router;