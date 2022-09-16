import TextField from '@mui/material/TextField';
import { useState } from "react";

interface ProductOriginProps{
  setOriginFilter: Function
}

const ProductOrigin = ({setOriginFilter}:ProductOriginProps) =>{
  const [origin, setOrigin] = useState('')

  const onOriginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrigin(event.target.value);
  }

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setOriginFilter(origin)
  }

  return (
      <TextField
        id="origin-field" 
        label="Origin" 
        value = {origin}
        fullWidth
        onChange={onOriginChange}
        onBlur={onBlur}
      />
  )
}

export default ProductOrigin