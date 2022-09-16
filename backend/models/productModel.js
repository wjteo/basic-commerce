class ProductModel {
  constructor(db){
    this.products = db.products
  }

  getByFilter({minPrice,maxPrice,origin}){
    if(maxPrice === undefined && minPrice === undefined && origin === undefined){
      return this.products
    }

    let filtered = this.products
    if(minPrice){
      filtered = filtered.filter((product)=>{
        return product.price >= minPrice
      })
    }

    if(maxPrice){
      filtered = filtered.filter((product)=>{
        return product.price <= maxPrice
      })
    }

    if(origin){
      filtered = filtered.filter((product)=>{
        return origin.toUpperCase() === product.origin.toUpperCase();
      })
    }
    return filtered
  }
}

module.exports = ProductModel
