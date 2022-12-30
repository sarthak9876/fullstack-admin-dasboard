//This is the schema of the user created which is going to represent the model of the data
import mongoose from "mongoose";



const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String, // name parameter is a string data type which is required to be filled with min value of length 2 and max value of length 100
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String, // name parameter is a string data type which is required to be filled with min value of length 2 and max value of length 100
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    occupation: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin"
    },
  },
  { timestamps: true} //this gives us created and updated date
);

const User = mongoose.model("User", UserSchema);

export default User;