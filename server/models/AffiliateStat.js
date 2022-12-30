//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: 'User'},
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true} //this gives us created and updated date
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);

export default AffiliateStat;