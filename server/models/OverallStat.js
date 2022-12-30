//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const OverallStatSchema = new mongoose.Schema(
  {
   totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }//this gives us created and updated date
);

const OverallStat = mongoose.model("OverallStat", OverallStatSchema);

export default OverallStat;