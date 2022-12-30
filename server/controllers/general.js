import User from "../models/User.js";
import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transactions.js";



export const getUser = async ( req,res) => {
  try{
    const {id } = req.params; // id is coming from the general.js file in which we are usinng user/:id 
    const user =await User.findById(id); // by using params we are getting an id and by using that id we are trying to find the user in the database
    res.status(200).json(user); // if user found then give status 200 and the data of the user in json
    
  } catch(error){
    res.staus(404).json({message: error.message})
  }
}

export const getDashboardStats = async (req,res) =>{
  try{
    // hardcoded values
    const currentMonth= "December";
    const currentYear = 2022;
    const currentDay= "2022-12-29"

    //recent transactions
    const transactions = await Transaction.find().limit(50).sort({ createdOn: -1}) // -1 sorts it backward

    //overall stats
    const overallStat = await OverallStat.find({ year: currentYear});
    const {
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory
    } = overallStat[0];

    const thisMonthStats= overallStat[0].monthlyData.find(({ month}) => {
      return month === currentMonth;
    });

    const todayStats= overallStat[0].dailyData.find(({ date}) => {
      return date === currentDay;
    });

    res.status(200).json({
      totalCustomers,
      yearlyTotalSoldUnits,
      yearlySalesTotal,
      monthlyData,
      salesByCategory,
      thisMonthStats,
      todayStats,
      transactions,
    })



  } catch(error){
    res.status(404).json({message: error.message})
  }
}