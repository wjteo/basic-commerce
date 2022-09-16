import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {DataContext} from '../App'
import { useContext } from 'react'

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'Product ID',
    width: 150,
  },
  {
    field: 'price',
    headerName: 'Price',
    width: 150,
  },
  {
    field: 'origin',
    headerName: 'Origin',
    type: 'number',
    width: 200,
  }
];

const ProductsTable = () => {
  const {products} = useContext(DataContext)
  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        hideFooterPagination
        autoHeight
        disableSelectionOnClick
      />
    </Box>
  )
}
export default ProductsTable