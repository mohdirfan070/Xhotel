require('dotenv').config();
const express  = require('express');
const app = express();

const cors = require('cors');
app.use(cors());


const mongoose = require('mongoose');


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB using Mongoose!');
    // Define your schemas and models here
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });




//  mongoose.connect('mongodb://localhost:27017/hotel').then(()=>{console.log("Successfully Connected To Database");});
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = process.env.MONGODB_URL;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(" successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


const User = require('./models/userSchema');
const Room = require('./models/RoomSchema');



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

app.get("/api/getbookings",async(req,res)=>{
    let result = await User.find({hotel:true});
    res.json({msg:"Hello from Backend",result});
});

app.patch("/api/deletebookings",async(req,res)=>{
    let {x} = req.body;
    // console.log(x);
    await User.findOneAndDelete({mobileNumber:x}).then(async()=>{
        let result = await User.find({hotel:true});
        res.json({msg:"Hello from Backend",result});
    })
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

//add Booking
app.post('/api/addbooking',async(req,res)=>{
    let {inpData} = req.body;
    await User.insertMany({name:inpData.name,mobileNumber:inpData.mobileNumber,idNumber:inpData.idNumber,roomNo:inpData.roomNo,date:inpData.date,checkInTime:inpData.checkInTime,}),
    res.json({status:true} );
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