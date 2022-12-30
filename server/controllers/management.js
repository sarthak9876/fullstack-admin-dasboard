import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transactions.js";


export const getAdmins = async (req,res) => {
  try{

    const admins = await User.find({ role: "admin"}).select("-password");
    res.status(200).json(admins);

  } catch(error){
    res.status(404).json({message: error.message});
  }
}

export const getUserPerformance =  async (req,res) => {
  try{

    const { id} = req.params;
    const userWithStats = await User.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id)}}, // we are finding the id of the user in the User database
      {
        $lookup: {
          from: "affiliatestats", // we want to look in the affilatestat database
          localField: "_id", // comparin the id of the current user with the userId in the affiliate stats table
          foreignField: "userId",
          as: "affiliateStats" // storing the above compared property in a property called affiliateStats
        },
      },
      {
        $unwind: "$affiliateStats", // flatten the array or object
      }
    ]);

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );
    
    res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions});


  } catch(error){
    res.status(404).json({message: error.message});
  }
}