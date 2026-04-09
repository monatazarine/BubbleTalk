const pool = require("../db");
const bcrypt = require('bcrypt');

// Middleware to check login status
module.exports.handleLogin = (req, res) => {
    try {
        if (req.session && req.session.user && req.session.user.username) {
            res.json({ loggedIn: true, username: req.session.user.username });
        } else {
            res.json({ loggedIn: false });
        }
    } catch (err) {
        console.error("Error checking login status:", err);
        res.status(500).json({ error: "Server error checking login status" });
    }
};

// Handle login attempt
module.exports.AttemptLogin = async (req, res) => {
    try {
        const potentialUser = await pool.query(
            'SELECT id, username, password FROM users u WHERE u.username = $1',
            [req.body.username]
        );

        if (potentialUser.rows.length > 0) {
            const isPass = await bcrypt.compare(req.body.password, potentialUser.rows[0].password);
            
            if (isPass) {
                // Save user info in session
                req.session.user = {
                    username: req.body.username,
                    id: potentialUser.rows[0].id
                };
                res.json({ loggedIn: true, username: req.body.username });
            } else {
                res.json({ loggedIn: false, status: true, message: "Wrong username or password" });
            }
        } else {
            res.json({ loggedIn: false, status: true, message: "Wrong username or password" });
        }
    } catch (err) {
        console.error("Error in AttemptLogin:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Handle signup attempt
module.exports.AttemptSignup = async (req, res) => {
    try {
        const existingUser = await pool.query(
            'SELECT username FROM users WHERE username = $1',
            [req.body.username]
        );

        if (existingUser.rows.length === 0) {
            const hashedPass = await bcrypt.hash(req.body.password, 10);
            const newUser = await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
                [req.body.username, hashedPass]
            );

            req.session.user = {
                username: req.body.username,
                id: newUser.rows[0].id
            };
            res.json({ loggedIn: true, username: req.body.username });
        } else {
            res.json({ loggedIn: false, status: true, message: "User already exists" });
        }
    } catch (err) {
        console.error("Error in AttemptSignup:", err);
        res.status(500).json({ error: "Internal server error" });
    }
};
