import React, { useState} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useGetCustomersQuery, useGetTransactionsQuery } from 'state/api'
import Header from 'components/Header'
import { useTheme } from '@emotion/react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import DataGridCustomToolbar from "components/DataGridCustomToolbar"

const Transactions = () => {

const theme = useTheme();
//values to be sent to the backend
const [page, setPage] = useState(0);
const [pageSize, setpageSize] = useState(20);
const [sort, setSort] = useState({})
const [search, setSearch] = useState("");

const [searchInput, setSearchInput] = useState("");

const { data, isLoading} = useGetTransactionsQuery({
  page,
  pageSize,
  sort: JSON.stringify(sort),
  search,
});

// console.log('data', data);
const columns = [
    {
      field: "_id", 
      headerName: "ID", 
      flex: 1,  
    },
    {
      field: "userId", 
      headerName: "User ID", 
      flex: 1,  
    },
    {
      field: "createdAt", 
      headerName: "Created At", 
      flex: 1,  
    },
    {
      field: "products", 
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,  
    },
    {
      field: "cost", 
      headerName: "Cost", 
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`
    },
  ];



return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <Box
      mt="40px"
      height="75vh" // it will take 75% of our screen's height size
      sx={{
        "& .MuiDataGrid-root": {
          border: "none"
        },
        "& .MuiDataGrid-cell": {
          borderBottom: "none"
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: theme.palette.primary.light,
        },
        "& .MuiDataGrid-footerContainer": {
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          borderTop: "none",
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          colors: `${theme.palette.secondary[200]} !important`
        }
      }}
      >
        <DataGrid 
        loading={isLoading}
        getRowId={(row) => row._id}
        rows={(data && data.transactions) || []}
        columns={columns}
        rowsPerPageOptions={[20,50,100]}
        rowCount={(data && data.total) || 0}
        pagination
        page={page}
        pageSize={pageSize}
        variant="standard"
        paginationMode="server"// for server side pagination
        sortingMode="server"
        onPageChange={(newPage) => setPage(newPage)} //configuration for setting new page
        onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
        onSortModelChange={(newSortModel) => setSort(...newSortModel)}
        components={{Toolbar: DataGridCustomToolbar}} // here we are passing a custom toolbar which we are making above and then passing in to material UI
        componentsProps={{
          toolbar: { searchInput, setSearchInput, setSearch}
        }}
        />
      </Box>

    </Box>
  );
}

export default Transactions
