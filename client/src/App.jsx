import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./theme";
import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard/";
import Layout from "./pages/layout";
import Products from "./pages/products";
import Customers from "./pages/customers";
import Transactions from "./pages/transactions";
import Geography from "./pages/geography";
import Overview from "./pages/overview";
import Daily from "./pages/daily";
import Monthly from "./pages/monthly";
import Breakdown from "./pages/breakdown";
import Admin from "./pages/admin";
import Performance from "./pages/performance";
import { Toaster, toast } from "react-hot-toast";
import { Warning } from "@mui/icons-material";

function App() {
  const { mode } = useSelector((state) => state.theme);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  useEffect(() => {
    toast(
      "Please bear with us as the dashboard's backend is hosted on Render's free tier, which may cause slight delays in data loading.",
      {
        duration: 5000,
        position: "top-center",
        style: {
          border: "1px solid #E7CB02",
          padding: "14px",
          color: "#311702",
          minWidth: "375px",
        },
        icon: <Warning sx={{ color: "#E7CB02", fontSize: "1.5rem" }} />,
      }
    );
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toaster />

        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                <Navigate
                  to="/dashboard"
                  replace
                />
              }
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/products"
              element={<Products />}
            />
            <Route
              path="/customers"
              element={<Customers />}
            />
            <Route
              path="/transactions"
              element={<Transactions />}
            />
            <Route
              path="/geography"
              element={<Geography />}
            />
            <Route
              path="/overview"
              element={<Overview />}
            />
            <Route
              path="/daily"
              element={<Daily />}
            />
            <Route
              path="/monthly"
              element={<Monthly />}
            />
            <Route
              path="/breakdown"
              element={<Breakdown />}
            />
            <Route
              path="/admin"
              element={<Admin />}
            />
            <Route
              path="/performance"
              element={<Performance />}
            />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
