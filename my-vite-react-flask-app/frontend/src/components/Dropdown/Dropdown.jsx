import React from "react";

const Dropdown =(props) => {

 return(
<div>
    <li className="dropdownItem">
        <a>{props.text}</a>
    </li>
    </div>
 )   
}

export default Dropdown