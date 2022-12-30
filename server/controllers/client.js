import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transactions.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";
// PRODUCTS

export const getProducts = async (req,res) => {
  try{

    const products = await Product.find(); // this gives us all the products present in mongodb


    const productsWithStats = await Promise.all( // for every product we are going to find the product stats by using the product ID and then return an array of object with product information along with the stats of the product.
      products.map( async (product) => {
        const stat= await ProductStat.find({
          productId: product._id
        })
        return{
          ...product._doc,
          stat,
        }
      })
    );

    res.status(200).json(productsWithStats)

  } catch(error){
    res.status(404).json({ message: error.message });
  }
}

// CUSTOMERS

export const getCustomers = async (req,res) => {
  try{

    const customers = await User.find({ role: "user" }).select("-password") //we dont want the password to be displayed on the frotnedn as well along with the user nfo wo that's why we are using -password to exclude password from being printed on the frontend
    res.status(200).json(customers);

  } catch(error){
    res.status(404).json({ message: error.message });
  }
}

// TRANSACTIONS

export const getTransactions = async (req, res) => {
  try{
    // sort should look like this { "filed" : "userId". "sort": "desc" or "aesc"}
    const { page = 1, pageSize = 20, sort= null, search=""} = req.query; // we are setting some default values for page, pageSize, sort and Search which are getting fetched from the frontend using req.query();

    // formatted sort should look like { userId: -1 }
    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1), // if the value of sort in the objectwe are making using JSON.parse is equal to asc then we are giving a value of 1 to the sortParsed.field else we are assigning -1 to it
      };
      return sortFormatted;

    }
    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } }
      ],
    })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize); // show limited transactions on single page

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i"} // we are counting with the serach items we have already found
    });



    res.status(200).json({
      transactions,
      total
    });

  } catch(error){
    res.status(404).json({message: error.message});
  }
}


// GEOGRAPHY
export const getGeography = async (req,res) => {
  try{

    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country); // this allows us to conver the country code from 2 alphabets to 3 alphabets in our data for the geography diagram
      if(!acc[countryISO3]){
        acc[countryISO3] = 0;
        
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations= Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count} // this is the type of input which NIVO can read in order to make a geography map from the data in which we are providing the country name in ID and the amount of users from that country as the value field
      }
    )
    res.status(200).json(formattedLocations);
  } catch(error) {
    res.status(404).json({ message: error.message});
  }
}
