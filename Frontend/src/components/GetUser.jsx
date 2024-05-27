import React, { useState } from "react";
import '../pages/AddData.css'
import axios from 'axios';
function GetUser() {
    let [inpData, setInpData]=useState({
        username:'',     
        name:"",  
        mobileNumber:"",
      });
      let reset = ()=>{
        setInpData({
           username:'',
           name:"", 
           mobileNumber:"",
        });
      }
      let[empty,setEmpty] = useState(false);
    let [response1, setResponse1]=useState(false);
    let[response2,setResponse2]=useState(false);
    let[userInfo,setUserInfo]=useState({
        name:"",
        mobileNumber:91,
        idNumber:"",
        checkInTime:'',
        roomNo:"",
        username:"",
    });
        let GetUser = async()=>{
          if(false){
            // alert("Empty Data Fields!");
            document.getElementById('alert-empty-inputs').showModal();
          }else{
            setResponse2(true);
            try{
            await axios.post('http://localhost:8000/api/getuser', { inpData}).then((response)=>{
              console.log(response);
                setUserInfo({
                    name:response.data.result[0].name,
                    mobileNumber:response.data.result[0].mobileNumber,
                    idNumber:response.data.result[0].idNumber,
                    checkInTime:response.data.result[0].checkInTime,
                    roomNo:response.data.result[0].roomNo,
                    username:response.data.result[0].username,
                });
                
                document.getElementById("alert-user-info" ).showModal()
              setInpData({
                username:'',
              });
              console.log(response);
              setTimeout(()=>{
                setResponse1(response );
              },2000);
            
            }).catch((err)=>{
              console.log(err);
            })
          }catch{
            console.log("Something went wrong!");
          }
          
        }
      }
      let changeData = (e)=>{
        setResponse2(false);
        if(e.target.name=="username"){
          setInpData({...inpData,username:e.target.value.trim()})
        }
        if(e.target.name=="name"){
          setInpData({...inpData,name:e.target.value.trim()})
        }
        if(e.target.name=="mobileNumber"){
          setInpData({...inpData,mobileNumber:e.target.value.trim()})
        }
       
      }
    
  return (
    <>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="alert-empty-inputs" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Cannot Submit!</h3>
    <p className="py-4">Please enter all input fields.</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


<dialog id="alert-user-info" className="modal">
  <div className="modal-box">
    <h3 className="py-4 font-bold text-start text-xl">Name: {userInfo.name}</h3>
    <p className="py-4 text-lg font-semibold text-start">Username: {userInfo.username}</p>
    <p className="py-4 text-lg font-semibold text-start ">CheckIn: {userInfo.checkInTime}</p>
    <p className="py-4 text-lg font-semibold text-start ">RoomNo: {userInfo.roomNo}</p>
    <p className="py-4 text-lg font-semibold text-start ">Mobile.No: {userInfo.mobileNumber}</p>
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


    <div className="parent-div">
         <div className="form-div bg-base-200 "> 
      <h1>Get-User</h1>
    
      <input name="username" type="text" onChange={changeData} id="" value={inpData.username} placeholder="Username" />

      <input name="name" type="text" onChange={changeData} id="" value={inpData.name} placeholder="Name" />
      <input name="mobileNumber" type="text" onChange={changeData} id="" value={inpData.mobileNumber} placeholder="MobileNumber" />

      {(response2)?(response1)?<h2 className="text-green-400">Fetched Data Successfully!</h2>: <span className="loading loading-spinner text-primary"></span>:" " }
      <div className="btn-div">
      <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="submit"  onClick={GetUser}>Submit</button> <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="reset"  onClick={reset}>Reset</button> 
      </div>
      </div>
      </div>
    </>
)
}

export default GetUser