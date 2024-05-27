const mongoose = require('mongoose');
// const currentDate = new Date();
// const localTime = currentDate.toLocaleTimeString();
// console.log(` ${localTime} `+(Date().split(" ").slice(1,4).toString()));
const currentDate = new Date();
const userSchema = new mongoose.Schema({
        name:{
        type:String,
        required:true,
             },
   mobileNumber:{
        type:Number,
        required:true,
          },
        idNumber:{
            type:String,
            default:"XYZ123"
          },
          username:{
            type:String,
            // required:true,
          },  date:{
            type:String,
          },
          date:{
            type:String,
            default:`${Date().split(" ").slice(1,4).toString()}`
          },
          checkInTime:{
            type:String,
            default:`${currentDate.toLocaleTimeString()+(Date().split(" ").slice(1,4).toString())}`
          },roomNo:{
            type:Number,
          },hotel:{
              type:Boolean,
              default:true
          }
})

const User = mongoose.model( 'User' ,userSchema);

module.exports = User;