class ProductDTO {
    constructor(data) {
      this.title = data.title;
      this.price = data.price;
      this.stock = data.stock;
      this.category = data.category
    }
  }
  
  module.exports = ProductDTO