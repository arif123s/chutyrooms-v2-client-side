import React from "react";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import "./RoomGuest.css";
import Plus from "./../../../../../assets/icons/plus.svg";
import Minus from "./../../../../../assets/icons/minus.svg";
import GreenAddIcon from "./../../../../../assets/icons/Add-circle-green.svg";
import ArrowDown from "./../../../../../assets/icons/arrow-down.svg";

const RoomGuest = ({ isDivClicked, setDivClicked }) => {

  const setDivClickedCus = (event) => {
    event.preventDefault();
    setDivClicked(!isDivClicked);
  }
  const [rooms, setRooms] = useState([
    {
      adults: 1,
      children: 1,
      child_age: {
        0: 1,
      },
    },
    // {
    //   adults: 2,
    //   children: 2,
    //   child_age: {
    //     0: 2,
    //     1: 1,
    //   },
    // },
    // {
    //   adults: 2,
    //   children: 2,
    //   child_age: {
    //     0: 3,
    //     1: 6,
    //   },
    // },
  ]);
 
  const [divVisibility, setDivVisibility] = useState('0');

  useEffect(() => {
    setDivVisibility(rooms.length-1);
  }, [rooms]);

  const removeRoom = (event, index) => {
    // Create a copy of the rooms array
    event.preventDefault();
    const updatedRooms = [...rooms];
    if(updatedRooms.length > 1){
      
      // Remove the room at the specified index
      updatedRooms.splice(index, 1);
  
      // Update state with the new rooms array
      setRooms(updatedRooms);

      // setDivVisibility( updatedRooms.length-1);

      console.log(updatedRooms, updatedRooms.length-1);
    }
  };

  const updateGuests = (event, index, type, value) => {

    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Update the guests for the specified room and type (adults or children)
    updatedRooms[index][type] = value;

    // Update state with the new rooms array
    setRooms(updatedRooms);
  };

  const addDiv = (event) => {
    
    event.preventDefault();
    const updatedRooms = [...rooms];
    if (updatedRooms.length < 4) {
    const newRoom = {
      adults: 1,  // You can set default values for adults and children as needed
      children: 0,
      child_age: {},  // Assuming no children initially
    };
    
    // Create a copy of the current rooms array
  
    // Add the new room to the array
    updatedRooms.push(newRoom);
  
    // Update state with the new rooms array
    setRooms(updatedRooms);

    // setDivVisibility(updatedRooms.length);

    // setDivVisibility((prevdivVisibility) => (prevdivVisibility === updatedRooms.length-1 ? null : updatedRooms.length-1))
    
  }
  
  };

  const addAdultGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Increment the number of adults for the specified room
    updatedRooms[index].adults = Math.min(updatedRooms[index].adults + 1, 3);

    // Update state with the new rooms array
    setRooms(updatedRooms);
  };

  const removeAdultGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Ensure that the number of adults doesn't go below 0
    updatedRooms[index].adults = Math.max(updatedRooms[index].adults - 1, 0);

    // Update state with the new rooms array
    setRooms(updatedRooms);
  };

  const addChildGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Increment the number of adults for the specified room
    updatedRooms[index].children = Math.min(updatedRooms[index].children + 1, 2);

    const newChildIndex = Object.keys(updatedRooms[index].child_age).length;

    if (newChildIndex < 2 ) {
    updatedRooms[index].child_age[newChildIndex] = 1;
    }
    // Update state with the new rooms array
    setRooms(updatedRooms);
  };

  const removeChildGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Ensure that the number of adults doesn't go below 0
    updatedRooms[index].children = Math.max(updatedRooms[index].children - 1, 0);

    const childAgeArrayLength = Object.keys(updatedRooms[index].child_age).length;

    if (childAgeArrayLength > 0 ) {
      delete updatedRooms[index].child_age[childAgeArrayLength-1];
      setRooms(updatedRooms);
    }

    // Update state with the new rooms array
    setRooms(updatedRooms);
  };

  

  // Function to toggle the visibility of a specific div
  const toggleVisibility = (divId) => {
    // setDivVisibility((prevVisibility) => ({
    //   ...prevVisibility,
    //   [divId]: !prevVisibility[divId] || false,
    // }));

    setDivVisibility((prevdivVisibility) => (prevdivVisibility === divId ? null : divId))
  }

  return (
    <div className="room-guest-content">
      {rooms.map((room, index) => (
        <div key={index}  >
          <div className="room-no-div" 
        onClick={() => toggleVisibility(index)}>
            <div className="room-no">Room {index + 1}</div>
            <a href="#" type="button" onClick={(e) => removeRoom(e, index)} className={`remove-btn ${index === 0 ? 'invisible' : ''}`}>
              Remove
            </a>
          </div>

        

          <div className={divVisibility == index ? 'visible' : 'hidden'}>
            <div className="adult-div">
              <div>Adults</div>
              <div className="guest-quantity-div">
                <a href="#" onClick={(e) =>
                    removeAdultGuest(e, index)
                    }>
                  <img className="minus-icon" src={Minus}></img>
                </a>
                <input
                  className="adult-quantity"
                  id={`adult-quantity-${index}`}
                  type="number"
                  value={room.adults}
                  onChange={(e) =>
                    updateGuests(e, index, "adults", parseInt(e.target.value))
                  }
                ></input>
                <a href="#" onClick={(e) =>
                    addAdultGuest(e, index)
                    }>
                  <img className="plus-icon" src={Plus}></img>
                </a>
              </div>
            </div>

            <div className="child-div">
              <div>Child</div>
              <div className="guest-quantity-div">
                <a href="#" onClick={(e) =>
                    removeChildGuest(e, index)
                    }>
                  <img className="minus-icon" src={Minus}></img>
                </a>
                <input
                  className="adult-quantity"
                  type="number"
                  onChange={(e) =>
                    updateGuests(e, index, "children", parseInt(e.target.value))
                  }
                  value={room.children}
                ></input>
                <a href="#" onClick={(e) =>
                    addChildGuest(e, index)
                    }>
                  <img className="plus-icon" src={Plus}></img>
                </a>
              </div>
            </div>
            <div className="childage-selection">
              {typeof room.child_age === "object" &&
                Object.keys(room.child_age).map((children_age, Childindex) => (
                  <div key={Childindex}>
                    {/* {(index == Childindex) ?
                  ( */}
                    <div key={Childindex} className="relative">
                      <select
                        className="childage-select-box childage"
                        onChange={(e) =>
                          updateGuests(
                            index,
                            "child_age",
                            parseInt(e.target.value)
                          )
                        }
                        // displayEmpty
                      >
                        <option
                          value={1}
                          selected={room.child_age[Childindex] === 1}
                        >
                          1
                        </option>
                        <option
                          value={2}
                          selected={room.child_age[Childindex] === 2}
                        >
                          2
                        </option>
                        <option
                          value={3}
                          selected={room.child_age[Childindex] === 3}
                        >
                          3
                        </option>
                        <option
                          value={4}
                          selected={room.child_age[Childindex] === 4}
                        >
                          4
                        </option>
                        <option
                          value={5}
                          selected={room.child_age[Childindex] === 5}
                        >
                          5
                        </option>
                        <option
                          value={6}
                          selected={room.child_age[Childindex] === 6}
                        >
                          6
                        </option>
                       
                      </select>
                     
                      <img className="arrow-icon-down" src={ArrowDown}></img>
                    </div>
                    {/* ) : (<div></div>)}*/}
                  </div>
                ))}
            </div>
            {/* ))} */}
          </div>
      
        </div>
      ))}

      <div className="btn-div">
        <a href="#" className="addroom-btn" onClick={(e) => addDiv(e)}>
          <img src={GreenAddIcon}></img>
          <p>Add Room</p>
        </a>
        <a href="#" onClick={(e) => setDivClickedCus(e)} className="done-btn">
          Done
        </a>
      </div>
    </div>
  );
};

export default RoomGuest;
