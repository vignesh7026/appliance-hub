const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('appliancehub.sqlite');

const schema = `
CREATE TABLE IF NOT EXISTS userss (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS productss (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    stock INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS cartss (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (user_id) REFERENCES userss(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES productss(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orderss (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total_amount REAL NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES userss(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_itemss (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    FOREIGN KEY (order_id) REFERENCES orderss(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES productss(id) ON DELETE CASCADE
);
`;

const seedData = `
INSERT INTO productss (name, description, price, stock) VALUES
('Washing Machine', 'High efficiency washing machine', 499.99, 10),
('Refrigerator', 'Double door refrigerator', 899.99, 5),
('Microwave', 'Convection microwave oven', 150.00, 20);
`;

db.serialize(() => {
    db.exec(schema, (err) => {
        if (err) {
            console.error("Error creating tables:", err);
        } else {
            console.log("Tables created successfully.");

            // Check if products exist, if not seed
            db.get("SELECT count(*) as count FROM productss", (err, row) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (row.count === 0) {
                    db.exec(seedData, (err) => {
                        if (err) console.error("Error seeding data:", err);
                        else console.log("Seed data inserted.");
                    });
                }
            });
        }
    });
});
