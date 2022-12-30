
import { Box, useTheme } from '@mui/system'
import Header from 'components/Header'
import React from 'react'
import { useGetUserPerformanceQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import CustomColumnMenu from 'components/DataGridCustomColumnMenu'
import { useSelector } from 'react-redux'


const Performance= () => {
  
  const theme = useTheme();
  const userId = useSelector((state) => state.global.userId);
  const {data, isLoading} = useGetUserPerformanceQuery(userId);
  // console.log('data',data);

  
  const columns = [
    {
      field: "_id", // the id which we are going to fetch from the database
      headerName: "ID", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "userId", // the id which we are going to fetch from the database
      headerName: "User ID", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "createdAt", // the id which we are going to fetch from the database
      headerName: "CreatedAt", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "products", // the id which we are going to fetch from the database
      headerName: "# of Products", // column title of each column
      flex: 0.4, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost", // the id which we are going to fetch from the database
      headerName: "Cost", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    }
  ]

  return (
   <Box m="1.5rem 2.5rem">
      <Header title="Performance" subtitle="Track your Affiliate Sales Performance here." />
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
        
        locading={isLoading || !data}
        getRowId={(row) => row._id}
        rows={(data && data.sales) || []}
        columns={columns}
        components={{
          ColumnMenu: CustomColumnMenu,
        }}
        />
      </Box>
    </Box>
  )
}

export default Performance;