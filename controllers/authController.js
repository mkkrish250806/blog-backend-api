const db = require("../config/db");
const bcrypt = require("bcryptjs");

// REGISTER USER
exports.register = (req, res) => {
    const { name, email, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "User Registered Successfully ✅" });
    });
};