import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../../components/PageHeader";
import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";
import { useGetDashboardQuery } from "../../features/dashboard/dashboardApi";
import FlexBetween from "../../components/utils/FlexBetween";
import DashboardBox from "../../components/DashboardBox";

export default function Dashboard() {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();

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
      headerName: "# of Products",
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
      <FlexBetween>
        <PageHeader
          title="Dashboard"
          subtitle="Welcome to Your Dashboard"
        />

        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "0.875rem",
              fontWeight: "bold",
              padding: "0.5rem 1rem",
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
                color: theme.palette.grey.text,
              },
            }}
          >
            <DownloadOutlined sx={{ mr: "0.5rem" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        my="0.5em"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="12rem"
        gap="1.2rem"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
      >
        {/* ROW 1 */}
        <DashboardBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "1.5rem" }}
            />
          }
        />
        <DashboardBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "1.5rem" }}
            />
          }
        />
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="0.5rem"
          borderRadius="0.5rem"
        >
          <OverviewChart
            view="sales"
            isDashboard={true}
          />
        </Box>
        <DashboardBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "1.5rem" }}
            />
          }
        />
        <DashboardBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "1.5rem" }}
            />
          }
        />

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: `1px solid ${theme.palette.grey.bg}`,
              borderRadius: "0.5rem",
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
            rows={(data && data.transactions) || []}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.5rem"
        >
          <Typography
            variant="h5"
            sx={{ color: theme.palette.secondary.light }}
          >
            Sales By Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            sx={{ color: theme.palette.grey.text }}
          >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
