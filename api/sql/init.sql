CREATE TABLE products
(
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255),
  photos text[],
  price NUMERIC(2),
  discount integer,
  category VARCHAR(255)
);
