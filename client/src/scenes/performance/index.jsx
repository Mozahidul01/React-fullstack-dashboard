import { Box, useTheme } from "@mui/material";
import PageHeader from "../../components/PageHeader";
import { useGetPerformanceQuery } from "../../features/performance/performanceApi";
import { useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";

export default function Performance() {
  const theme = useTheme();
  const userId = useSelector((state) => state.user.id);
  const { data, isLoading } = useGetPerformanceQuery(userId);

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
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "Number of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="0.5rem 1rem">
      <PageHeader
        title="Affiliate  Performance"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt="40px"
        height="75vh"
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
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
        />
      </Box>
    </Box>
  );
}
