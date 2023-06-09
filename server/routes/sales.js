import express from "express";
import { getSaleStat } from "../controllers/sales.js";

const router = express.Router();

router.get("/saleStat", getSaleStat);

export default router;
