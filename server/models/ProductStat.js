import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    yearlySalesTotal: {
      type: Number,
    },
    yearlytotalSoldUnits: {
      type: Number,
    },
    year: {
      type: Number,
      max: 4,
    },
    monthlyData: {
      type: [
        {
          month: String,
          totalSales: Number,
          totalUnits: Number,
        },
      ],
    },
    dailyData: {
      type: [
        {
          date: String,
          totalSales: Number,
          totalUnits: Number,
        },
      ],
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const ProductStat = mongoose.model("ProductStat", productStatSchema);
export default ProductStat;
