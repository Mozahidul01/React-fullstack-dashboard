import mongoose from "mongoose";

const affiliateStatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const AffiliateStat = mongoose.model("AffiliateStat", affiliateStatSchema);
export default AffiliateStat;
