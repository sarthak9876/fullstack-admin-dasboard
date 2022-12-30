//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const ProductStatStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number
      }
    ],
    dailyData: [
      {
      data: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
  },
  { timestamps: true} //this gives us created and updated date
);

const ProductStat = mongoose.model("ProductStat", ProductStatStatSchema);

export default ProductStat;