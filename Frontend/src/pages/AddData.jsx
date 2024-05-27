import React, { useState } from "react";
import Navbar from "../components/Navbar";
import TextField from '@mui/material/TextField';
import './AddData.css'
import axios from 'axios';
import AddUser from "../components/AddUser";
import AddRoom from "../components/AddRoom";
import DeleteRoom from "../components/DeleteRoom";
function AddData() {


  return (
    <>
    <Navbar/>
    <div className="data-div">
    <AddRoom/>
    <DeleteRoom/>
   <AddUser/>
    </div>
   
     
    </>
  );
}

export default AddData;
