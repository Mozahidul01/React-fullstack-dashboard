import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetCustomersQuery } from "../../features/customers/customersApi";
import PageHeader from "../../components/PageHeader";
import Error from "../../components/utils/Error";

export default function Customers() {
  const { data: customers, isLoading, isError } = useGetCustomersQuery();
  const theme = useTheme();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
  ];

  return (
    <Box m="0.5em 1em">
      <PageHeader
        title="Customers"
        subtitle="List of Customers"
      />
      {isError ? (
        <Error message="Oops! An Error Occure" />
      ) : (
        <Box
          height="80dvh"
          sx={{
            "& .MuiDataGrid-root": {
              border: `1px solid ${theme.palette.grey.bg}`,
            },
            "& .MuiDataGrid-cell": {
              border: "none",
            },
            "& .MuiDataGrid-row:nth-of-type(even)": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary[100],
              border: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundcolor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.primary[100],
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.primary[100]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !customers}
            getRowId={(row) => row._id}
            rows={customers || []}
            columns={columns}
          />
        </Box>
      )}
    </Box>
  );
}
