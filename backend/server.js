// Import required modules
const express = require("express");
const mysql = require("mysql2");
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

// Serve static files from the frontend folder
app.use(express.static(frontendPath));

// Create MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Fixed incorrect variable name
  database: process.env.DB_NAME, // Fixed incorrect variable name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.stack);
    return;
  }
  console.log("✅ Connected to MySQL database.");
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
  db.query("SELECT * FROM productss", (err, results) => {
    if (err) {
      console.error("❌ Error fetching products:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

app.post("/cart", (req, res) => {
  const { product_id, quantity } = req.body;
  db.query("INSERT INTO cartss (product_id, quantity) VALUES (?, ?)", [product_id, quantity], (err, result) => {
    if (err) {
      console.error("❌ Error adding to cart:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ message: "✅ Added to cart", id: result.insertId });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
