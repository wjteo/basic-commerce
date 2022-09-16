import Box from '@mui/material/Box';
import ProductPriceRange from './ProductPriceRange'
import ProductOrigin from './ProductOrigin'
import { useState } from "react";
import Button from '@mui/material/Button';
import { IPriceRange } from '../types';
import axios from 'axios';
import {DataContext} from '../App'
import { useContext } from 'react'

const ProductFilters = () =>{
  const [hasPriceRangeError, setHasPriceRangeError] = useState(false)
  const [filter,setFilter] = useState({})
  const {setProducts} = useContext(DataContext)

  const setPriceRangeFilter = (priceRange:IPriceRange) => {
    setFilter({
      ...filter,
      ...priceRange
    })
  }

  const setOriginFilter = (origin: String) => {
    setFilter({
      ...filter,
      origin
    })
  }

  const onSearchClick = () =>{
    axios.get(`/products`,{params: filter}).then((res)=>{
      setProducts(res.data)
    })
  }

  return (
    <Box 
      sx={{
        marginTop: 5,
        marginBottom: 5,
        gap: 2,
        display: 'flex',
        flexDirection: 'row'
      }}>
      <Box
        sx={{
          flex:2
        }}
      >
        <ProductPriceRange setPriceRangeFilter={setPriceRangeFilter} setHasPriceRangeError={setHasPriceRangeError}/>
      </Box>
      <Box
        sx={{
          flex:2
        }}
      >
        <ProductOrigin setOriginFilter={setOriginFilter}/>
      </Box>
      <Box
        textAlign = 'center'
        sx={{
          alignSelf: 'center',
          justifyContent: 'flex-start',
          flex:1
        }}
      >
        <Button size='large' variant="contained" disabled={hasPriceRangeError} onClick={onSearchClick}>Search</Button>
      </Box>
    </Box>
  )
}

export default ProductFilters