import mongoose from "mongoose";

const overallStatSchema = new mongoose.Schema(
  {
    totalCustomers: {
      type: Number,
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
      validate: {
        validator: function (value) {
          const currentYear = new Date().getFullYear();
          return value <= currentYear;
        },
        message: "Year must be less than or equal to the current year.",
      },
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
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const OverallStat = mongoose.model("OverallStat", overallStatSchema);
export default OverallStat;
