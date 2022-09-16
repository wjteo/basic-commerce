const request = require('supertest')

const mockDb = {
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

jest.mock('../../db',()=>mockDb)
const app = require('../../app')

//API test to only test main flows, more cases tested at the unit test level
describe('api /products',()=>{
  afterAll(()=>{
    jest.restoreAllMocks()
  })
  describe('given no filters', ()=>{
    it('should return all products',async ()=>{
      const res = await request(app).get('/products')
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(mockDb.products.length)
      expect(res.body).toEqual(expect.arrayContaining(mockDb.products))
    })
  })
  describe('given some filters', ()=>{
    it('should return all products',async ()=>{
      const res = await request(app).get('/products').query({
        minPrice: 100,
        maxPrice: 150,
        origin: 'singapore'
      })
      expect(res.status).toEqual(200)
      expect(res.body).toHaveLength(1)
      expect(res.body).toEqual(expect.arrayContaining([{
        id: 'product_2',
        origin: 'Singapore',
        price: 100 
      }]))
    })
  })
  describe('given filter is invalid', ()=>{
    it('should return all products',async ()=>{
      const res = await request(app).get('/products').query({
        minPrice: -1,
        maxPrice: 150,
      })
      expect(res.status).toEqual(400)
    })
  })
})