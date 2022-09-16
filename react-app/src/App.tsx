import {Container,Box} from '@mui/material';
import Typography from '@mui/material/Typography';

import { useState, createContext } from 'react';
import ProductFilters from './components/ProductFilters'
import ProductsTable from './components/ProductsTable';

export const DataContext = createContext<any>(null)

function App() {
  const [products, setProducts] = useState([]);

  return (
    
    <Container>
      <DataContext.Provider value={{products,setProducts}}>
        <Box sx={{
          marginTop: 5,
          marginBottom: 5
        }}>
          <Typography variant="h3">
            Search Products
          </Typography>
        </Box>
        <ProductFilters/>
        <ProductsTable/>
      </DataContext.Provider>;
    </Container>
  );
}

export default App;
