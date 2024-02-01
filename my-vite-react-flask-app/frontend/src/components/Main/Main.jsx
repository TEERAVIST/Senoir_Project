import React, { useState } from "react";
import './Main.css'
// import Home from "../Home/Home";
import { IoMdArrowDropdown } from "react-icons/io";   //have to do npm install react-icon
import Dropdown from "../Dropdown/Dropdown.jsx";
import { IoMdArrowDropup } from "react-icons/io";
import CustomDropdown from "../Dropdown/CustomDropdown.jsx"



const Main =() => {
  const [open, setOpen] = useState(false);
 

 return(
<section className="mainSection"> 
     <header className="header flex">
        <div className="logoDiv">
            <a href="#" className="logo">
            <h1 className="font-text">IDEAL-D</h1>
            <h3 className="font2">Building a Predictive Model to Classify Network Security Attacks</h3>
            </a> 
        </div>

        <div className="mainBar">
        <ul className="mainlist flex">
            <li className="mainItem flex">
              <a href="#" className="mainLink" 
              onMouseEnter={() => {
                  setOpen(true);
                }}
                onMouseLeave={() => {               //onMouseEnter={()=>{setOpen(!open)}} if you want to  use onClick instead  and <div className={`dropdown-menu ${open? 'active' : 'inactive'}`}
                  setOpen(false);                         
                }} 
                > Model {open ? <IoMdArrowDropdown className="icon" /> : <IoMdArrowDropup className="icon" /> }
                </a></li>
              <div className={`dropdown-menu ${open? 'active' : ''}`} 
              onMouseEnter={() => {
                  setOpen(true);
                }}
                onMouseLeave={() => {
                  setOpen(false);
                }}>
              <ul>
              <a href="#" onClick={ToggleEvent} ><Dropdown text = {"cat /proc/filesystems"} /></a>
              <a href="#" ><Dropdown text = {"uname -a"} /></a>
              <a href="#" ><Dropdown text = {"lsof -i"} /></a>
              <a href="#" ><Dropdown text = {"sudo netstat -anp"} /></a>
              <a href="#" ><Dropdown text = {"sudo ss -tanup"} /></a>
              </ul>
           </div>

            <li className="mainItem flex">
              <a href="#" className="mainLink"> Scanning </a>
            </li>
            <li className="mainItem flex">
              <a href="#" className="mainLink"> General Manual <IoMdArrowDropup  className="icon"/></a>
            </li>
            <li className="mainItem flex">
              <a href="#" className="mainLink"> Clear </a>
            </li>
        </ul>
        </div>
       
     </header>
</section>
 )   
              }

export default Main