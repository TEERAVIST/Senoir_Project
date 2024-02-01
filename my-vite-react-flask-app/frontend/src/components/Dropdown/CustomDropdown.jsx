import React from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({ text }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {text}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* Add menu items if needed */}
        {/* <Dropdown.Item href="#/action-1">Action</Dropdown.Item> */}
        {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item> */}
        {/* Add more items as needed */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default CustomDropdown;
