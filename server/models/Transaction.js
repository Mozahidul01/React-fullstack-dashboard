import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    cost: {
      type: String,
      required: true,
      min: 0,
    },
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number,
    },
  },
  { timestamps: { currentTime: () => new Date().toLocaleString() } }
);

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
