import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

//Data Imports
import { dataAffiliateStat } from "./data/index.js";
import AffiliateStat from "./models/AffiliateStat.js";

// CONFIGURATION
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hi, This is rest api for admin dashboard");
});

//ROUTES
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/sales", salesRoutes);
app.use("/management", managementRoutes);

/* MONGOOSE SETUP */
const port = process.env.PORT || 9000;
const db_url = process.env.MONGO_URL;

const connect = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(port, () => {
      console.log(`our app is connected on ${port}}`);

      /* ONLY ADD DATA ONE TIME */
      // AffiliateStat.insertMany(dataAffiliateStat);
      // OverallStat.insertMany(dataOverallStat);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
      // Transaction.insertMany(dataTransaction);
      // User.insertMany(dataUser);
    });
  } catch (error) {
    console.log("Error connecting to Database :", error);
  }
};

connect();
