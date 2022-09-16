const ProductQuery = require('../../../models/productQuery')

describe('ProductQuery validate', ()=>{
  it.each`
    query|result
    ${{}}                                                   |${true}
    ${{minPrice: '0'}}                                      |${true}
    ${{maxPrice: '0'}}                                      |${true}
    ${{minPrice: '0', maxPrice: 0}}                         |${true}
    ${{minPrice: '0', maxPrice: 0, origin: 'Singapore'}}    |${true}
    ${{minPrice: '0', origin: 'Singapore'}}                 |${true}
    ${{maxPrice: '0', origin: 'Singapore'}}                 |${true}
    ${{minPrice: '2', maxPrice: '1'}}                       |${false}
    ${{minPrice: '-1'}}                                     |${false}
    ${{maxPrice: '-1'}}                                     |${false}
    ${{minPrice: 'a'}}                                      |${false}
    ${{maxPrice: 'a'}}                                      |${false}
  `('given query $query, it should return $result',({query,result})=>{
    const productQuery = new ProductQuery(query)
    expect(productQuery.validate()).toEqual(result)
  })
})

describe('ProductQuery getQuery', ()=>{
  describe('given an empty object',()=>{
    it('should return object null properties',()=>{
      const productQuery = new ProductQuery({})
      expect(productQuery.getQuery()).toEqual({})
    })
  })
  it('should return sanitized query',()=>{
    const productQuery1 = new ProductQuery({minPrice: '0', maxPrice: '1', origin: ' Singapore '})
    expect(productQuery1.getQuery()).toEqual({minPrice: 0, maxPrice: 1, origin: 'Singapore'})
    const productQuery2 = new ProductQuery({maxPrice: '1', origin: ' Singapore '})
    expect(productQuery2.getQuery()).toEqual({maxPrice: 1, origin: 'Singapore'})
    const productQuery3 = new ProductQuery({minPrice: '0', origin: ' Singapore '})
    expect(productQuery3.getQuery()).toEqual({minPrice: 0, origin: 'Singapore'})
  })
})