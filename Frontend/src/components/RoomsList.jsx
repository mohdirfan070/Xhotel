import React, { useEffect, useState } from "react";
import "./RoomList.css";
import '../pages/AddData.css'
import axios from "axios";
import { Link } from "react-router-dom";
import AddCustomer from "./AddCustomer";
function RoomsList() {
  const currentDate = new Date();

  let [mssg, setmssg] = useState("");
  let [gotData, setGotData] = useState([]);
  let [inpData, setInpData]=useState({
    name:"",
    username:"",
    mobileNumber:null,
    idNumber:"",
    checkInTime:`${currentDate.toLocaleTimeString()+" "+(Date().split(" ").slice(1,4).toString())}`,
    roomNo:0
  });
  let getData = async () => {
    await axios.get("/api/rooms").then((response) => {
      // console.log(response.data.msg);
      setmssg(response.data.msg);
      // console.log("Got data");
      // console.log(response.data.result[0].features);
      setGotData(response.data.result);
      // setimages(response.data.result.map((card) => card));
    });
  };
  useEffect(() => {
      getData();
  }, []);


  let takeRoom = (x) => {
    console.log("Working");
    // console.log(x);
    setInpData({...inpData,roomNo:x});
    document.getElementById("my_modal_4").showModal();
     
  };


      let submitRoom = ()=>{

      }

      let addCustomer = async()=>{
            
        if(inpData.name=="" || inpData.mobileNumber==91 || inpData.idNumber=="" ){
          // alert("Empty Data Fields!");
          document.getElementById('my_modal_1').showModal()
        }else{
          setResponse2(true);
          try{
          await axios.post('https://xhotel-osu7.onrender.com/api/addcustomer', { inpData}).then((response)=>{
            reset();
            getData();
            // setInpData({
            //   name:"",
            //   mobileNumber:91,
            //   idNumber:"",
            //   checkInTime:'',
            //   username:'',
            //   roomNo:num`
            // });
            console.log(response);
            setTimeout(()=>{
              setResponse1(response);
            },2000);
          
          }).catch((err)=>{
            console.log(err);
          })
        }catch{
          console.log("Something went wrong!");
        }
        
      }
    }

    function reset(){
      setInpData({
        name:"",
        username:'',
        mobileNumber:"",
        idNumber:"",
        checkInTime:`${currentDate.toLocaleTimeString()+" "+(Date().split(" ").slice(1,4).toString())}`,
        roomNo: 0
      });
    }

      let [response1, setResponse1]=useState(false);
      let[response2,setResponse2]=useState(false);

      let changeData = (e)=>{

        setResponse2(false);
        if(e.target.name=="name"){
          setInpData({...inpData,name:e.target.value})
        }if(e.target.name=="mobileNumber"){
          setInpData({...inpData,mobileNumber:e.target.value})
        }if(e.target.name=="idNumber"){
          setInpData({...inpData,idNumber:e.target.value})
        }if(e.target.name=="checkInTime"){
          setInpData({...inpData,checkInTime:e.target.value})
        }if(e.target.name=="username"){
          setInpData({...inpData,username:e.target.value})
        }
        if(e.target.name=="roomNo"){
            setInpData({...inpData,roomNo:e.target.value})
          }
       
      }
   
  return (
    <>



      <p>This is messege from backend : "{(mssg)?(mssg):<><span className="loading loading-spinner text-primary"></span><span>Please! wait...</span></>}"</p>

      <div className="card-container   my-3  flex justify-center align-top gap-2 flex-wrap h-max">
        {gotData.map((card, i) => (
          <React.Fragment key={i}>

        <dialog id="my_modal_4" className="modal ">
         <div className="modal-box w-11/12 max-w-5xl">
      <h3 className="font-bold text-xl text-center text-lg">RoomNo:{inpData.roomNo}</h3>
      <p className="py-4 text-center">Press Esc button  to close</p>
      {/* <div className="modal-action"> */}
        {/* <form action="#" method="post"> */}

        <>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
     <dialog id="my_modal_1" className="modal">
     <div className="modal-box">
    <h3 className="font-bold text-lg">Cannot Submit!</h3>
    <p className="py-4">Please enter all input fields.</p>
    <div className="modal-action">
      {/* <form onSubmit={handleSubmit} method="dialog"> */}
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
          {/* </form> */}
          </div>
         </div>
        </dialog>

    <div className="parent-div">
         <div className="form-div bg-base-200 "> 
      <h1>Addd User</h1>
      <input name="name" type="text" onChange={changeData} id="" value={inpData.name} placeholder="Enter Name" />
      <input name="username" type="text" onChange={changeData} id="" value={inpData.username} placeholder="Username" />
      <input name="mobileNumber" type="number" placeholder="Mobile Number" onChange={changeData} id=""  value={inpData.mobileNumber} />
      <input name="idNumber" type="text"  id=""  onChange={changeData} value={inpData.idNumber} placeholder="Id Number" />
      <input name="checkInTime" type="time"  id="" onChange={changeData} value={inpData.checkInTime} placeholder="Checkin Time" />
      <label htmlFor="RoomLabel">RoomNo:</label>
      <input type="text" name="roomNo"  value={inpData.roomNo}   id="RoomLabel" />
      {(response2)?(response1)?<h2 className="text-green-400">Data Saved Successfully!</h2>: <span className="loading loading-spinner text-primary"></span>:" " }
      <div className="btn-div">
      <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="submit"  onClick={addCustomer}>Submit</button> 
      <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="reset"  onClick={reset}>Reset</button> 
      </div>
      </div>
      </div>
    </>


          {/* <AddCustomer RoomNumber={inpData.roomNo}/> */}
       </div>
        </dialog>

            <div className="card w-[22rem] bg-base-100   border-cyan-700 border-2 hover:scale-[1.02] ">
              <figure className="px-10 pt-10 overflow-x-auto">
                <img
                  src={card.photos.img1}
                  alt={card.roomNo}
                  className="rounded-xl min-h-48"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">Category : {card.category}</h2>
                <p className=" font-bold">Fare :₹{card.fare}/night</p>
                <p className=" font-bold">RoomNo : {card.roomNo}</p>
                <p > Features : {card.features}</p>
                <div className="card-actions">
                  {/* You can open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn bg-teal-700"
                    onClick={() => {
                      takeRoom(card.roomNo);
                    }}
                  >
                    Take Now
                  </button>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default RoomsList;
