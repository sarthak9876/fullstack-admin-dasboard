import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetCustomersQuery } from 'state/api'
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'
import { PanoramaSharp } from '@mui/icons-material'


const Customers = () => {

  const theme = useTheme();
  const { data, isLoading} = useGetCustomersQuery();

  // console.log('data', data);

  const columns = [
    {
      field: "_id", // the id which we are going to fetch from the database
      headerName: "ID", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "name", // the id which we are going to fetch from the database
      headerName: "Name", // column title of each column
      flex: 0.5, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "email", // the id which we are going to fetch from the database
      headerName: "Email", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "phoneNumber", // the id which we are going to fetch from the database
      headerName: "Phone Number", // column title of each column
      flex: 0.5, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
      rendercell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/,"($1)$2-$3") // we are taking the value and replacing it with a regular expression and format a phone number like 1234567890 as (123)456-7890 in this \d represents a number {3} represents the length of the numbers and$1,2,3 represents the format in which we need the phone number to be displayed
      }
    },
    {
      field: "country", // the id which we are going to fetch from the database
      headerName: "Country", // column title of each column
      flex: 0.4, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "occupation", // the id which we are going to fetch from the database
      headerName: "Occupation", // column title of each column
      flex: 1, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    },
    {
      field: "role", // the id which we are going to fetch from the database
      headerName: "Role", // column title of each column
      flex: 0.5, // how we want each coum to grow, shrick or how much space it can take. 1 represent evenly spaced. For smaller space we can use 0.5
    }
  ]
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of customers" />
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
        getRowId={(row) => row._id}
        locading={isLoading || !data}
        rows={data || []}
        columns={columns}
        />
      </Box>
    </Box>
  )
}

export default Customers
