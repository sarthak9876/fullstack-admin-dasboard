import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarDensitySelector, 
  GridToolbarContainer, 
  GridToolbarExport,
  GridToolbarColumnsButton 
} from '@mui/x-data-grid';
import FlexBteween from './FlexBetween';



const DataGridCustomToolbar = ({searchInput, setSearchInput, setSearch}) => {
  return (
    <GridToolbarContainer>
      <FlexBteween width="100%">
        <FlexBteween >
          <GridToolbarColumnsButton /> 
          <GridToolbarDensitySelector />
          <GridToolbarExport /> 
        </FlexBteween>
        <TextField
          label="Search..."
          sx={{
            mb: "0.5rem",
            width: "15rem"
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                onClick={() => {
                  setSearch(searchInput); // we will pass the search input to the setSearch state variable
                  setSearchInput(""); // and set the setSearchInput statevariable to empty string
                }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </FlexBteween>  
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
