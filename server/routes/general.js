import express from "express";
import {
  getUser,
  getUsers,
  getDashboardStats,
} from "../controllers/general.js";

const router = express.Router();

router
  .get("/users", getUsers)
  .get("/users/:id", getUser)
  .get("/dashboard", getDashboardStats);

export default router;
