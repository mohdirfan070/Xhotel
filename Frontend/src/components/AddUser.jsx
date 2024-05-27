import React, { useState } from "react";
import '../pages/AddData.css'
import axios from 'axios';
function AddUser() {
    let [inpData, setInpData]=useState({
        name:"",
        username:'',
        mobileNumber:91,
        idNumber:"",
        checkInTime:''
      });
      let reset = ()=>{
        setInpData({
          name:"",
          username:'',
          mobileNumber:91,
          idNumber:"",
          checkInTime:''
        });
      }
      let[empty,setEmpty] = useState(false);
    let [response1, setResponse1]=useState(false);
    let[response2,setResponse2]=useState(false);
        let addUser = async()=>{
          if(inpData.name=="" || inpData.mobileNumber==91 || inpData.idNumber=="" ){
            // alert("Empty Data Fields!");
            document.getElementById('my_modal_1').showModal()
          }else{
            setResponse2(true);
            try{
            await axios.post('https://xhotel-osu7.onrender.com/api/adduser', { inpData}).then((response)=>{
              setInpData({
                name:"",
                mobileNumber:91,
                idNumber:"",
                checkInTime:'',
                username:'',
              });
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
       
      }
    
  return (
    <>
         {/* Open the modal using document.getElementById('ID').showModal() method */}
    <dialog id="my_modal_1" className="modal">
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

    <div className="parent-div">
         <div className="form-div bg-base-200 "> 
      <h1>Addd User</h1>
      <input name="name" type="text" onChange={changeData} id="" value={inpData.name} placeholder="Enter Name" />
      <input name="username" type="text" onChange={changeData} id="" value={inpData.username} placeholder="Username" />
      <input name="mobileNumber" type="number" onChange={changeData} id=""  value={inpData.mobileNumber} placeholder="Mobile Number" />
      <input name="idNumber" type="text"  id=""  onChange={changeData} value={inpData.idNumber} placeholder="Id Number" />
      <input name="checkInTime" type="time"  id="" onChange={changeData} value={inpData.checkInTime} placeholder="Checkin Time" />
      {(response2)?(response1)?<h2 className="text-green-400">Data Saved Successfully!</h2>: <span className="loading loading-spinner text-primary"></span>:" " }
      <div className="btn-div">
      <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="submit"  onClick={addUser}>Submit</button> <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="reset"  onClick={reset}>Reset</button> 
      </div>
      </div>
      </div>
    </>
)
}

export default AddUser