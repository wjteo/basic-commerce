const ProductModel = require('../../../models/productModel')

describe('ProductModel getByFilter', ()=>{
  describe('given db has no data',()=>{
    const db = {
      products : []
    }

    it('should return empty array',()=>{
      const productModel = new ProductModel(db);
      expect(productModel.getByFilter({})).toHaveLength(0)
      expect(productModel.getByFilter({minPrice: 50, maxPrice:100, origin: 'Singapore'})).toHaveLength(0)
    })

  })

 describe('given db has some data', ()=>{
    const db = {
      products: [{
        id: 'product_1',
        origin: 'Singapore',
        price: 50       
      },{
        id: 'product_2',
        origin: 'Singapore',
        price: 100 
      },{
        id: 'product_3',
        origin: 'Korea',
        price: 150
      },{
        id: 'product_4',
        origin: 'China',
        price: 200
      }]
    }
    const productModel = new ProductModel(db)

    describe('given no filters',()=>{
      it('should return all products',()=>{
        const results = productModel.getByFilter({})
        expect(results).toHaveLength(db.products.length)
        expect(results).toEqual(expect.arrayContaining(db.products))
      })
    })

    describe('given min and max price filter',()=>{
      it('should return products correctly',()=>{
        const results = productModel.getByFilter({minPrice: 100, maxPrice: 150})
        expect(results).toHaveLength(2)
        expect(results).toEqual(expect.arrayContaining([
          {
            id: 'product_2',
            origin: 'Singapore',
            price: 100 
          },{
            id: 'product_3',
            origin: 'Korea',
            price: 150
          }
        ]))
      })
    })

    describe('given min price and origin filter',()=>{
      it('should return products correctly',()=>{
        const results = productModel.getByFilter({minPrice: 100, origin: 'singapore'})
        expect(results).toHaveLength(1)
        expect(results).toEqual(expect.arrayContaining([
          {
            id: 'product_2',
            origin: 'Singapore',
            price: 100 
          }
        ]))
      })
    })

    describe('given max price and origin filter',()=>{
      it('should return products correctly',()=>{
        const results = productModel.getByFilter({maxPrice: 50, origin: 'singapore'})
        expect(results).toHaveLength(1)
        expect(results).toEqual(expect.arrayContaining([
          {
            id: 'product_1',
            origin: 'Singapore',
            price: 50 
          }
        ]))
      })
    })

    describe('given origin filter',()=>{
      it('should return products correctly',()=>{
        const results = productModel.getByFilter({origin: 'Singapore'})
        expect(results).toHaveLength(2)
        expect(results).toEqual(expect.arrayContaining([{
          id: 'product_1',
          origin: 'Singapore',
          price: 50       
        },{
          id: 'product_2',
          origin: 'Singapore',
          price: 100 
        }]))
      })
    })

    describe('given given both origin and price filter',()=>{
      it('should return products correctly',()=>{
        const results = productModel.getByFilter({origin: 'Singapore', minPrice: 100, maxPrice: 150})
        expect(results).toHaveLength(1)
        expect(results).toEqual(expect.arrayContaining([{
          id: 'product_2',
          origin: 'Singapore',
          price: 100 
        }]))
      })
    })

  })
})