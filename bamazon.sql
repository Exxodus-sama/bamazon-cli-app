CREATE DATABASE Bamazon_db;

USE Bamazon_db;

CREATE TABLE products(
ItemID INTEGER AUTO_INCREMENT PRIMARY KEY,
Product VARCHAR(30),
Department VARCHAR(30),
Price DOUBLE(10,2),
Stock INTEGER
);

INSERT INTO products(Product, Department, Price, Stock)
VALUES ("iPhone X", "electronics", 1000.00, 10),
("Watch the Throne", "music", 12.99, 10),
("PS4", "electronics", 399.99, 5),
("Xbox One", "electronics", 399.99, 7),
("The Life of Pablo", "music", 12.99, 8),
("Bicycle", "sporting goods", 599.99, 2),
("Fishing Rod", "sporting goods", 59.99, 10),
("World War Z", "books", 9.99, 20),
("Java Basics", "books", 19.99, 33),
("Attack on Titan Manga", "books", 11.99, 6),
("Pulp Fiction", "dvds", 13.99, 36),
("Independence Day", "dvds", 9.99, 21),
("Man on the Moon", "music", 11.55, 15);

  -- To view entries, uncomment the command below
  -- SELECT * FROM products;