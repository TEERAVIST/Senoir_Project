import React, { useState } from "react";
import './Main.css'
import Home from "../home/home";
import { IoMdArrowDropdown } from "react-icons/io";   //have to do npm install react icon
import Dropdown from "../Dropdown/Dropdown";
import { IoMdArrowDropup } from "react-icons/io";



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
         <Home />
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
              <a href="#" ><Dropdown text = {"Pig"} /></a>
              <a href="#" ><Dropdown text = {"Pig"} /></a>
              <a href="#" ><Dropdown text = {"Pig"} /></a>
              <a href="#" ><Dropdown text = {"Pig"} /></a>
              <a href="#" ><Dropdown text = {"Pig"} /></a>
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