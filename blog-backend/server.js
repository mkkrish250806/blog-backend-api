require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

// ================= ROUTES =================

// auth routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// ✅ blog routes (ADD THIS)
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

// ================= MIDDLEWARE =================
const verifyToken = require("./middleware/authMiddleware");

// ✅ PROTECTED ROUTE
app.get("/api/protected", verifyToken, (req, res) => {
  res.json({
    message: "You accessed protected route!",
    user: req.user
  });
});

// ================= SERVER START =================
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

