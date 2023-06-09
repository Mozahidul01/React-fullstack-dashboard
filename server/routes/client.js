import express from "express";
import {
  getCustomer,
  getCustomers,
  getProduct,
  getProducts,
  getProductswithStats,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

const router = express.Router();

router
  .get("/products", getProducts)
  .get("/products_stat", getProductswithStats)
  .get("/products/:id", getProduct)
  .get("/customers", getCustomers)
  .get("/customers/:id", getCustomer)
  .get("/transactions", getTransactions)
  .get("/geography", getGeography);

export default router;
