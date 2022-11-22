class Product {
  constructor(id, name, price, description) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
  }
  toString() {
    return this.name + "\n" + this.price + "\n" + this.description;
  }
}

module.exports = Product;
