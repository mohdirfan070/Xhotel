const mongoose = require('mongoose');

const room  = new mongoose.Schema({
        category:{
            type:String,
            required:true,
            default:"general"
        },
        features:{
            type:String,
            default:"General",
        },
        fare:{
            type:Number,
            required:true,
            default:0
        },
        roomNo:{
            type:Number,
            required:true,
            default:0,
        },
        occupied:{
            type:Boolean,
            default:false
        },
        takenBy:{
            type:String,
            default:"none@123"
        },
        photos:{
            type:Object,
            required:true,
            default:{
                img1:"https://cache.marriott.com/marriottassets/marriott/LASJW/lasjw-guestroom-0111-hor-clsc.jpg?interpolation=progressive-bilinear&",
                img2:"",
                img3:"",
                img4:"",
                img5:"",
        }
    }
})

const Room = mongoose.model("Room",room);
module.exports = Room;