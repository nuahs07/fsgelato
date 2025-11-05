-- Seed ProductCategory
INSERT INTO product_category (id, category_name) VALUES (1, 'Classic Dairy') ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);
INSERT INTO product_category (id, category_name) VALUES (2, 'Seasonal') ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);
INSERT INTO product_category (id, category_name) VALUES (3, 'Sorbet') ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);
INSERT INTO product_category (id, category_name) VALUES (4, 'Premium') ON DUPLICATE KEY UPDATE category_name=VALUES(category_name);

-- Seed Product
INSERT INTO product (name, description, price, image_url, is_seasonal, is_dairy_free, units_in_stock, category_id)
VALUES
('Vanilla Bean', 'Classic vanilla gelato', 120.00, 'assets/products/vanilla.jpg', 0, 0, 50, 1),
('Dark Chocolate', 'Rich dark chocolate gelato', 140.00, 'assets/products/dark-chocolate.jpg', 0, 0, 40, 1),
('Mango Sorbet', 'Refreshing dairy-free mango', 110.00, 'assets/products/mango-sorbet.jpg', 0, 1, 60, 3),
('Strawberry Swirl', 'Fresh strawberry bits', 125.00, 'assets/products/strawberry.jpg', 0, 0, 45, 1),
('Pistachio', 'Premium Sicilian pistachio', 160.00, 'assets/products/pistachio.jpg', 0, 0, 35, 4),
('Pumpkin Spice', 'Seasonal favorite', 130.00, 'assets/products/pumpkin-spice.jpg', 1, 0, 20, 2),
('Lemon Sorbet', 'Zesty lemon dairy-free', 115.00, 'assets/products/lemon-sorbet.jpg', 0, 1, 55, 3),
('Salted Caramel', 'Salty-sweet caramel', 145.00, 'assets/products/salted-caramel.jpg', 0, 0, 30, 4);


