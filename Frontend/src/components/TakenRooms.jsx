import React from 'react'
import { useEffect, useState } from "react";
import "./RoomList.css";
import '../pages/AddData.css'
import axios from "axios";
import AddUser from './AddUser';
import GetUser from './GetUser';
function TakenRooms() {

    let [mssg, setmssg] = useState("");
  let [gotData, setGotData] = useState([]);

    let getData = async () => {
        await axios.get("/api/takenrooms").then((response) => {
          setmssg(response.data.msg);
          setGotData(response.data.result);
        console.log(response.data.result);
        })
      };
      useEffect(() => {
        getData();
    }, []);

    let leaveRoom = async(roomNo)=>{
        axios.patch('/api/removecustomer',{roomNo}).then((response) => {
          setmssg(response.data.msg);
          getData();
          });
       
    }


  return (
    <>
     <p>This is messege from backend : "{(mssg)?(mssg):<><span className="loading loading-spinner text-primary"></span><span>Please! wait...</span></>}"</p>
    {(gotData)? (  <div className="card-container   my-3  flex justify-center align-top gap-2 flex-wrap h-max">
      {gotData.map((card, i) => (
        <React.Fragment key={i}>

    
          <div className="card w-[22rem] bg-base-100   border-cyan-700 border-2 hover:scale-[1.02] ">
            <figure className="px-10 pt-10 overflow-x-auto">
              <img
                src={card.photos.img1}
                alt={card.roomNo}
                className="rounded-xl min-h-48"
              />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Taken By : {card.takenBy}</h2>
              <p className=" font-bold">Fare :₹{card.fare}/night</p>
              <p className=" font-bold">RoomNo : {card.roomNo}</p>
              <p > Features : {card.features}</p>
              <div className="card-actions">
                {/* You can open the modal using document.getElementById('ID').showModal() method */}
                <button
                  className="btn bg-teal-700"
                  onClick={() => {
                    leaveRoom(card.roomNo);
                  }}
                >
                  leave Now
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>): ("No Rooms are Taken")}
   
  <GetUser/>
   
  </>  )
}

export default TakenRooms