CREATE DATABASE appliancehub;

USE appliancehub;

CREATE TABLE userss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE productss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL
);

CREATE TABLE cartss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (user_id) REFERENCES userss(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES productss(id) ON DELETE CASCADE
);

CREATE TABLE orderss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES userss(id) ON DELETE CASCADE
);

CREATE TABLE order_itemss (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES orderss(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES productss(id) ON DELETE CASCADE
);