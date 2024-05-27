require('dotenv').config();
const express  = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
// 'mongodb://localhost:27017/hotel'
// mongoose.connect().then(()=>{console.log("Successfully Connected To Database");});

main().then(()=>{
    console.log("Connected to database Succesfully!");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGODB_CONNECT_URI);
}

const User = require('./models/userSchema');
const Room = require('./models/RoomSchema');

app.use(cors());

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Listenning on Port: ${PORT}`);
});
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 

//Load Empty Rooms
app.get("/api/rooms",async(req,res)=>{
    let result = await Room.find({occupied:false});
    res.json({msg:"Hello from Backend,These are Empty Rooms",result});
});

// Load Taken Rooms
app.get("/api/takenrooms",async(req,res)=>{
    // let roomData = await Room.find({occupied:true});
    // let userData = [];
    // roomData.map((ele)=>{
    //     userData.push(ele);
    // })
    // // let userData = await User.find({roomNo:roomData.roomNo});
    // let result = {roomData,userData};
    // res.json({msg:"Hello from Backend,These are Taken Rooms",result});


    let result =  await Room.find({occupied:true});
     res.json({msg:"Hello from Backend,These are Taken Rooms",result});
})

//Add USer
app.post('/api/adduser',(req,res)=>{
    let {inpData} = req.body;
    // console.log(inpData.name);
    res.json({status:true , inpData } );
});

app.post('/api/getuser',async(req,res)=>{
    let {inpData} = req.body;
    // console.log(inpData.username);
    if(inpData.username){
        let result  = await User.find({username:inpData.username});
        res.json({status:true , result } );
    }
    if(inpData.name){
        let result  = await User.find({name:inpData.name});
        res.json({status:true , result } );
    }
    if(inpData.mobileNumber){
        let result  = await User.find({mobileNumber:inpData.mobileNumber});
        res.json({status:true , result } );
    }
   
});


//Add Room
app.post('/api/addroom',async(req,res)=>{
    let {inpData} = req.body;
    await Room.insertMany({category:inpData.category,features:inpData.features,fare:inpData.fare,roomNo:inpData.roomNo,photos:{img1:inpData.img1,img2:inpData.img2,img3:inpData.img3,img4:inpData.img4,img5:inpData.img5}}).then((response)=>{
        console.log("New Room Added Successfully!"+response);
    }).catch((err)=>{
        console.log(err);
    });
    res.json({status:true , inpData } );
})
//Delete ROom
app.delete('/api/deleteroom',async(req,res)=>{
    let {inpData} = req.body;
    // console.log(inpData.roomNo);
    await Room.findOneAndDelete({roomNo:inpData.roomNo}); 
    res.json({status:true , inpData } );
});

app.post('/api/addCustomer',async(req,res)=>{
    let {inpData} = req.body;
    await Room.findOneAndUpdate({roomNo:inpData.roomNo},{occupied:true,takenBy:inpData.username},{new:true});
   await   User.insertMany({name:inpData.name,username:inpData.username,mobileNumber:inpData.mobileNumber,idNumber:inpData.idNumber,checkInTime:inpData.checkInTime,roomNo:inpData.roomNo}).then((resposne)=>{
    res.json({status:true , inpData } );
   }).catch((err)=>{
    res.json({status:true ,  msg:"Something went wrong while inserting the data"+(err) } );
   })
   
});

app.patch("/api/removecustomer",async(req,res)=>{
    let result = req.body;
    // console.log(result.roomNo);
    await User.findOneAndDelete({roomNo:result.roomNo});
     await Room.findOneAndUpdate({roomNo:result.roomNo},{occupied:false,takenBy:""},{new:true})
    res.json({msg:"Hello from Backend,Room Le Liya gaya hai!"});
})