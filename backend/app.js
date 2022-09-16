const express = require('express')
const db = require('./db')
const ProductModel = require('./models/productModel')
const ProductQuery = require('./models/productQuery')

const app = express()

const MESSAGE_INVALID_PARAMETERS='invalid query parameters'

app.get('/products/',(req,res)=>{
  const productModel = new ProductModel(db)
  const productQuery = new ProductQuery(req.query)
  if(!productQuery.validate()){
    res.status(400).json({message: MESSAGE_INVALID_PARAMETERS})
    return
  }
  res.json(productModel.getByFilter(productQuery.getQuery()))
})

module.exports=app;