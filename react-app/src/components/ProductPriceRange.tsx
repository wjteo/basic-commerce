import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from "react";
import {IPriceRange} from '../types'

interface ProductPriceRangeProps{
  setPriceRangeFilter: Function
  setHasPriceRangeError: Function
}

const ProductPriceRange = ({setPriceRangeFilter,setHasPriceRangeError}:ProductPriceRangeProps) =>{
  const [minPriceStr, setMinPriceStr] = useState('')
  const [maxPriceStr, setMaxPriceStr] = useState('')
  const [priceRange, setPriceRange] = useState<IPriceRange>({})
  const [minPriceError, setMinPriceError] = useState(false)
  const [maxPriceError, setMaxPriceError] = useState(false)
  const [rangeError, setRangeError] = useState(false)


  const onMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPriceStr(event.target.value);
  }

  const onMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPriceStr(event.target.value);
  }

  const onMinPriceBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = minPriceStr.trim();
    if(trimmed.length===0){
      setMinPriceStr('');
      setPriceRange({...priceRange,minPrice: undefined});
      setMinPriceError(false)
      return
    }

    const numMinPrice=parseFloat(trimmed)
    if(isNaN(numMinPrice) || numMinPrice<0){
      setMinPriceError(true)
      return
    }
    setMinPriceError(false)
    setMinPriceStr(numMinPrice.toFixed(2));
    setPriceRange({...priceRange,minPrice: parseFloat(numMinPrice.toFixed(2))});
  }

  const onMaxPriceBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const trimmed = maxPriceStr.trim();
    if(trimmed.length===0){
      setMaxPriceStr('');
      setPriceRange({...priceRange,maxPrice: undefined});
      setMaxPriceError(false)
      return
    }

    const numMaxPrice=parseFloat(trimmed)
    if(isNaN(numMaxPrice) || numMaxPrice<0){
      setMaxPriceError(true)
      return
    }
    setMaxPriceError(false)
    setMaxPriceStr(numMaxPrice.toFixed(2));
    setPriceRange({...priceRange,maxPrice: parseFloat(numMaxPrice.toFixed(2))});
  }

  useEffect(()=>{
    let hasRangeError = false;
    const minPrice = priceRange.minPrice;
    const maxPrice =priceRange.maxPrice;
    if((minPrice || minPrice === 0) && (maxPrice || maxPrice ===0)){
      if(minPrice>maxPrice){
        hasRangeError=true
      }
    }
    setRangeError(hasRangeError)
    if(!minPriceError && !maxPriceError && !hasRangeError){
      setPriceRangeFilter({minPrice,maxPrice})
    }
  },[priceRange.minPrice,priceRange.maxPrice])

  useEffect(()=>{
    setHasPriceRangeError(minPriceError || maxPriceError || rangeError)
  },[minPriceError,maxPriceError,rangeError])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1
      }}
    >
      <Box
        sx={{
          flex: 1
        }}
      >
        <TextField 
          id="min-price-field" 
          label="Minimum Price" 
          value = {minPriceStr} 
          onChange={onMinPriceChange} 
          onBlur={onMinPriceBlur}
          fullWidth
          error = {minPriceError || rangeError}
        />
      </Box>
      <Box
        sx={{
          flex: 1
        }}
      >
        <TextField 
          id="max-price-field"
          label="Maximum Price"
          value = {maxPriceStr} 
          onChange={onMaxPriceChange}
          onBlur={onMaxPriceBlur}
          fullWidth
          error = {maxPriceError || rangeError}
        />
      </Box>
    </Box>
  )
}

export default ProductPriceRange