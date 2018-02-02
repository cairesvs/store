CREATE TABLE products
(
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  photos text[] NOT NULL,
  price NUMERIC(12, 2) NOT NULL,
  discount integer NOT NULL,
  category VARCHAR(255) NOT NULL,
  document tsvector
);

CREATE INDEX idx_fts_search ON products USING gin(document);
