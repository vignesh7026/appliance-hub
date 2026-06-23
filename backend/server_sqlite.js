// Import required modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables from .env
dotenv.config();

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define paths
const frontendPath = path.join(__dirname, "../frontend"); // Adjust path if needed
const dbPath = path.join(__dirname, "../appliancehub.sqlite");

// Serve static files from the frontend folder
app.use(express.static(frontendPath));

// Connect to the database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
        return;
    }
    console.log("✅ Connected to SQLite database.");
});

// Serve frontend HTML files
const pages = ["arrival", "cart", "index", "login", "order", "products", "register"];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.sendFile(path.join(frontendPath, `${page}.html`));
    });
});

// Serve frontend assets (styles.css & app.js)
app.get("/styles.css", (req, res) => {
    res.sendFile(path.join(frontendPath, "styles.css"));
});

app.get("/app.js", (req, res) => {
    res.sendFile(path.join(frontendPath, "app.js"));
});

// Define API endpoints
app.get("/products", (req, res) => {
    db.all("SELECT * FROM productss", [], (err, results) => {
        if (err) {
            console.error("❌ Error fetching products:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
});

app.post("/cart", (req, res) => {
    const { product_id, quantity } = req.body;
    // Use function() to access this.lastID
    db.run("INSERT INTO cartss (product_id, quantity) VALUES (?, ?)", [product_id, quantity], function (err) {
        if (err) {
            console.error("❌ Error adding to cart:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json({ message: "✅ Added to cart", id: this.lastID });
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser`);
});
