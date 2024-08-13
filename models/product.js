
const db = require('../util/database');

const Cart = require('./cart')

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    if (this.id) {
        // Update existing product
        return db.execute(
            'UPDATE products SET title = ?, imageUrl = ?, description = ?, price = ? WHERE id = ?',
            [this.title, this.imageUrl, this.description, this.price, this.id]
        );
    } else {
        // Insert new product
        return db.execute(
            'INSERT INTO products (title, imageUrl, description, price) VALUES (?, ?, ?, ?)',
            [this.title, this.imageUrl, this.description, this.price]
        );
    }
  }

  static deleteById(id) {
    
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id){
    
  }
};
