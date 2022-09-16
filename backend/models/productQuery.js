class ProductQuery {
  constructor(query) {
    this.query = query
  }

  validate() {
    const minPrice = this.query.minPrice;
    const minPriceNum = minPrice?parseFloat(minPrice):null
    const maxPrice = this.query.maxPrice;
    const maxPriceNum = maxPrice?parseFloat(maxPrice):null

    if (minPrice) {
      if (!this._validatePrice(minPriceNum)) {
        return false
      }
    }

    if (maxPrice) {
      if (!this._validatePrice(maxPriceNum)) {
        return false
      }
    }

    if (minPriceNum && maxPriceNum) {
      if (minPriceNum > maxPriceNum) {
        return false
      }
    }

    return true
  }

  _validatePrice(price) {
    if (isNaN(price)) {
      return false
    }
    if (price < 0) {
      return false
    }
    return true
  }

  // _validatePriceRange(priceRange) {
  //   if (!Array.isArray(priceRange)) {
  //     return false
  //   }
  //   if (priceRange.length !== 2) {
  //     return false
  //   }
  //   for (const priceLimit of priceRange) {
  //     if (isNaN(priceLimit)) {
  //       return false
  //     }
  //     if (priceLimit < 0) {
  //       return false
  //     }
  //   }
  //   if (priceRange[0] > priceRange[1]) {
  //     return false
  //   }
  //   return true
  // }

  getQuery() {
    const minPrice = this.query.minPrice;
    const maxPrice = this.query.maxPrice;
    const origin = this.query.origin;
    return {
      minPrice: minPrice?parseFloat(minPrice):undefined,
      maxPrice: maxPrice?parseFloat(maxPrice):undefined,
      origin: origin?origin.trim():undefined
    }
  }
}

module.exports = ProductQuery