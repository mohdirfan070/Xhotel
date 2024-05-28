import React, { useState } from "react";
import '../pages/AddData.css'
import axios from 'axios';
function AddUser() {
    let[gotUsers,setGotUsers]=useState([]);
    let [inpData, setInpData]=useState({
        name:"",
        date:'',
        mobileNumber:"",
        idNumber:"",
        checkInTime:'',
        roomNo:"",
      });
      let reset = ()=>{
        setInpData({
          name:"",
          date:'',
          mobileNumber:"",
          idNumber:"",
          checkInTime:'',
          roomNo:"",
        });
      }
      let[empty,setEmpty] = useState(false);
    let [response1, setResponse1]=useState(false);
    let[response2,setResponse2]=useState(false);


    let getUsers = async()=>{
      
                    await axios.get('http://localhost:8000/api/getbookings').then((response)=>{
                            console.log(response);
                            setGotUsers([...response.data.result]);
                    });
          
    }


  
        getUsers();
     


        let addUser = async()=>{
          if(inpData.name=="" || inpData.mobileNumber==91 || inpData.roomNo=="" ){
            // alert("Empty Data Fields!");
            document.getElementById('my_modal_1').showModal()
          }else{
            setResponse2(true);
            try{
            await axios.post('https://xhotel-lo9z.onrender.com/api/addbooking', { inpData}).then((response)=>{
              setInpData({
                name:"",
                mobileNumber:"",
                idNumber:"",
                checkInTime:'',
                date:'',
                roomNo:"",
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
        }if(e.target.name=="date"){
          setInpData({...inpData,date:e.target.value})
        } if(e.target.name=="roomNo"){
            setInpData({...inpData,roomNo:e.target.value})
          }
       
      }
    
      let deleteBooking = async(x)=>{
        // console.log("working");
        // console.log(x);
        await axios.patch('https://xhotel-lo9z.onrender.com/api/deletebookings',{x}).then((response)=>{
            // console.log(response);
            setGotUsers([...response.data.result]);
    });
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
      <input name="roomNo" type="text" onChange={changeData} id="" value={inpData.roomNo} placeholder="RoomNo" />
      <input name="mobileNumber" type="number" onChange={changeData} id=""  value={inpData.mobileNumber} placeholder="Mobile Number" />
      <input name="idNumber" type="text"  id=""  onChange={changeData} value={inpData.idNumber} placeholder="Id Number" />
      <input name="checkInTime" type="time"  id="" onChange={changeData} value={inpData.checkInTime} placeholder="Checkin Time" />
      <input name="date" type="date" placeholder="Date" id="" onChange={changeData} value={inpData.date}  />

      {(response2)?(response1)?<h2 className="text-green-400">Data Saved Successfully!</h2>: <span className="loading loading-spinner text-primary"></span>:" " }
      <div className="btn-div">
      <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="submit"  onClick={addUser}>Submit</button> <button className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500" type="reset"  onClick={reset}>Reset</button> 
      </div>
      </div>
      </div>

      <div className="overflow-x-auto mb-20 m-auto max-w-[80%]">
  <table className="table">
    {/* head */}
    <thead>
      <tr className="bg-base-300">
        <th>Sl.No</th>
        <th>Name</th>
        <th>MobileNo</th>
        <th>RoomNo</th>
        <th>Date&Time</th>
        <th></th>
      </tr>
    </thead>

       

    <tbody>
    {/* {(gotUsers)?(gotUsers.map((user,i)=>{<tr className="hover">
        <th>{i+1}</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>})) :"No Bookings Yet"} */}

      {(gotUsers.length>0)?gotUsers.map((user,i)=>( <React.Fragment key={i}> <tr className="bg-base-300">
        <th>{i+1}</th>
        <th>{user.name}</th>
        <th>{user.mobileNumber}</th>
        <th>{user.roomNo}</th>
        <th>{user.date}{user.time}</th>
        <button onClick={ ()=>{ deleteBooking(user.mobileNumber)}} >🗑️</button>
      </tr> </React.Fragment> )):<><h2 className="text-center">No Bookings Found</h2></>}
      {/* row 1 */}
     
      {/* row 2 */}
      {/* <tr className="hover">
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr> */}
      {/* row 3 */}
      {/* <tr className="hover">
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr> */}
    </tbody>
  </table>
</div>


    </>
)
}

export default AddUser