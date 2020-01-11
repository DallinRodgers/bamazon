DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
use bamazon_db;

CREATE TABLE products (
	id INTEGER(10)  auto_increment NOT NULL,
    product_name VARCHAR(125),
    department_name VARCHAR(125),
    price DECIMAL(5,2),
    stock_quantity INTEGER(10),
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tea Bags", "Food", 3.75, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Hot Dogs", "Food", 5.32, 35);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 499.99, 15);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("PlayStation 4 Pro", "Electronics", 399, 18);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bose Headphones", "Electronics", 212.97, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chair", "Furniture", 400, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sofa", "Furniture", 700.99, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Table", "Furniture", 250, 13);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Frozen 2", "Movies", 20, 8);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Joker", "Movies", 20, 14);

SELECT * FROM products;