import React from 'react'
import { useState } from "react";
import "../pages/AddData.css";
import axios from "axios";
function DeleteRoom() {
    let [empty, setEmpty] = useState(false);
    let [response1, setResponse1] = useState(false);
    let [response2, setResponse2] = useState(false);

    let [inpData, setInpData] = useState({
        roomNo: "",
      });
      let reset = () => {
        setInpData({
          roomNo: "",
        });
      };
      
      let deleteRoom = async () => {
        if (inpData.roomNo == ""  ) {
          // alert("Empty Data Fields!");
          document.getElementById("my_modal_1").showModal();
        } else {
          setResponse2(true);
          try {
            await axios
              .delete("https://xhotel-lo9z.onrender.com/api/deleteroom", {data:{inpData} })
              .then((response) => {
                setInpData({
                  roomNo: "",
                });
                console.log(response);
                setTimeout(() => {
                  setResponse1(response);
                }, 2000);
              })
              .catch((err) => {
                console.log(err);
              });``
          } catch {
            console.log("Something went wrong!");
          }
        }
      };

      let changeData = (e) => {
        setResponse2(false);
        if (e.target.name == "roomNo") {
            setInpData({ ...inpData, roomNo: e.target.value });
          }
      };

  return (
    <>
         <div className="parent-div">
        <div className="form-div bg-base-200 ">
          <h1>Delete Room</h1>
          <input
            name="roomNo"
            type="number"
            placeholder="RoomNo"
            onChange={changeData}
            value={inpData.roomNo}
          />
          {response2 ? (
            response1 ? (
              <h2 className="text-green-400">Room Deleted Successfully!</h2>
            ) : (
              <span className="loading loading-spinner text-primary"></span>
            )
          ) : (
            " "
          )}
          <div className="btn-div">
            <button
              className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500"
              onClick={deleteRoom}
            >
              Delete
            </button>{" "}
            <button
              className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeleteRoom