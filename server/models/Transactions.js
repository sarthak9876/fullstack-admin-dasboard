//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    products: {
      type: [mongoose.Types.ObjectId],
      of: Number
    },
  },
  { timestamps: true} //this gives us created and updated date
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;