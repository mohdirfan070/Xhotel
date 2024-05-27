import React from "react";
import { useState } from "react";
import "../pages/AddData.css";
import axios from "axios";
function AddRoom() {
  let [inpData, setInpData] = useState({
    roomNo: "",
    category: "",
    features: "",
    fare: 0,
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
  });
  let reset = () => {
    setInpData({
      roomNo: "",
      category: "",
      features: "",
      fare: 0,
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
    });
  };
  let [empty, setEmpty] = useState(false);
  let [response1, setResponse1] = useState(false);
  let [response2, setResponse2] = useState(false);
  let addRoom = async () => {
    if (
      inpData.roomNo == "" ||
      inpData.category == "" ||
      inpData.features == [] ||
      inpData.fare == 0,
      inpData.img1==""
    ) {
      // alert("Empty Data Fields!");
      document.getElementById("my_modal_1").showModal();
    } else {
      setResponse2(true);
      try {
        await axios
          .post("http://localhost:8000/api/addroom", { inpData })
          .then((response) => {
            setInpData({
              roomNo: "",
              category: "",
              features: "",
              fare: 0,
              img1: "",
              img2: "",
              img3: "",
              img4: "",
              img5: "",
            });
            console.log(response);
            setTimeout(() => {
              setResponse1(response);
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
          });
      } catch {
        console.log("Something went wrong!");
      }
    }
  };
  let changeData = (e) => {
    setResponse2(false);
    if (e.target.name == "features") {
      setInpData({ ...inpData, features: e.target.value });
    }
    if (e.target.name == "roomNo") {
      setInpData({ ...inpData, roomNo: e.target.value });
    }
    if (e.target.name == "category") {
      setInpData({ ...inpData, category: e.target.value });
    }
    if (e.target.name == "fare") {
      setInpData({ ...inpData, fare: e.target.value });
    }
     if (e.target.name == "img1") {
      setInpData({ ...inpData, img1: e.target.value });
    }
    if (e.target.name == "img2") {
        setInpData({ ...inpData, img2: e.target.value });
      }
    if (e.target.name == "img3") {
        setInpData({ ...inpData, img3: e.target.value });
      }
      if (e.target.name == "img4") {
        setInpData({ ...inpData, img4: e.target.value });
      }
      if (e.target.name == "img5") {
        setInpData({ ...inpData, img5: e.target.value });
      }
  };

  return (
    <>
      <div className="parent-div">
        <div className="form-div bg-base-200 ">
          <h1>Addd Room</h1>
          <input
            name="roomNo"
            type="number"
            placeholder="RoomNo"
            onChange={changeData}
            value={inpData.roomNo}
          />
          <input
            name="category"
            type="text"
            placeholder="Category"
            onChange={changeData}
            value={inpData.category}
          />
          <input
            name="features"
            type="text"
            placeholder="Features"
            onChange={changeData}
            value={inpData.features}
          />
          <input
            name="fare"
            type="number"
            placeholder="Fare"
            onChange={changeData}
            value={inpData.fare}
          />
          <input
            name="img1"
            type="text"
            placeholder="Image1"
            onChange={changeData}
            value={inpData.img1}
          />
          <input
            name="img2"
            type="text"
            placeholder="Image2"
            onChange={changeData}
            value={inpData.img2}
          />
          <input
            name="img3"
            type="text"
            placeholder="Image3"
            onChange={changeData}
            value={inpData.img3}
          />
          <input
            name="img4"
            type="text"
            placeholder="Image4"
            onChange={changeData}
            value={inpData.img4}
          />
          <input
            name="img5"
            type="text"
            placeholder="Image5"
            onChange={changeData}
            value={inpData.img5}
          />
          {response2 ? (
            response1 ? (
              <h2 className="text-green-400">Data Saved Successfully!</h2>
            ) : (
              <span className="loading loading-spinner text-primary"></span>
            )
          ) : (
            " "
          )}
          <div className="btn-div">
            <button
              className="btn bg-teal-800 text-[1rem] hover:text-white hover:bg-teal-500"
              onClick={addRoom}
            >
              Submit
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
  );
}

export default AddRoom;
