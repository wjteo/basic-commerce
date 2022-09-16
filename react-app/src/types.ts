export interface IProduct {
  id: String
  price: Number
  origin: String
}

export interface IPriceRange {
  minPrice?: Number,
  maxPrice?: Number
}