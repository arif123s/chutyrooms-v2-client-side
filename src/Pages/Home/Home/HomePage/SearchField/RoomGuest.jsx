/* eslint-disable react/prop-types */
import React from "react";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import "./RoomGuest.css";
import Plus from "./../../../../../assets/icons/plus.svg";
import Minus from "./../../../../../assets/icons/minus.svg";
import GreenAddIcon from "./../../../../../assets/icons/Add-circle-green.svg";
import ArrowDown from "./../../../../../assets/icons/arrow-down.svg";

const RoomGuest = ({ isDivClicked, setDivClicked, updateRoomsqty , rooms , setRooms }) => {

  const setDivClickedCus = (event) => {
    event.preventDefault();
    setDivClicked(!isDivClicked);
  }

  // const [rooms, setRooms] = useState([
  //   {
  //     adults: 1,
  //     children: 1,
  //     child_age: {
  //       0: 1,
  //     },
  //   },
  // ]);

  const [divVisibility, setDivVisibility] = useState("0");

  // useEffect(() => {
  //   setDivVisibility(rooms.length-1);
  // }, []);

  const removeRoom = (event, index) => {
    // Create a copy of the rooms array
    event.preventDefault();
    const updatedRooms = [...rooms];
    if (updatedRooms.length > 1) {
      // Remove the room at the specified index
      updatedRooms.splice(index, 1);

      // Update state with the new rooms array
      setRooms(updatedRooms);
      updateRoomsqty(updatedRooms);
      // setDivVisibility( updatedRooms.length-1);
      console.log(updatedRooms, updatedRooms.length - 1);
    }
  };




  const updateGuests = ( roomIndex, childIndex, value) => {
   
    // const updatedRooms = [...rooms];
  
    // updatedRooms[index][type] = value;
   
    // setRooms(updatedRooms);


    
    setRooms(prevRooms => {
      const updatedRooms = [...prevRooms];
      if (!updatedRooms[roomIndex].child_age) {
        updatedRooms[roomIndex].child_age = [];
      }
      updatedRooms[roomIndex].child_age[childIndex] = value;
   
      return updatedRooms;
    });
  };

  const addDiv = (event) => {
    event.preventDefault();

    const NumberofRooms = [...rooms];
    if (NumberofRooms.length < 4) {
    const newRoom = {
      adults: 1,  // You can set default values for adults and children as needed
      children: 0,
      child_age: {},  // Assuming no children initially
    };
    
    // Create a copy of the current rooms array
  
    // Add the new room to the array
    NumberofRooms.push(newRoom);
  
    // Update state with the new rooms array
    setRooms(NumberofRooms);
    updateRoomsqty(NumberofRooms);
    setDivVisibility(rooms.length);

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
    updateRoomsqty(updatedRooms);
  };

  const removeAdultGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Ensure that the number of adults doesn't go below 0
    updatedRooms[index].adults = Math.max(updatedRooms[index].adults - 1, 0);

    // Update state with the new rooms array
    setRooms(updatedRooms);
    updateRoomsqty(updatedRooms);
  };

  const addChildGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Increment the number of adults for the specified room
    updatedRooms[index].children = Math.min(
      updatedRooms[index].children + 1,
      2
    );

    const newChildIndex = Object.keys(updatedRooms[index].child_age).length;

    if (newChildIndex < 2) {
      updatedRooms[index].child_age[newChildIndex] = 1;
    }
    // Update state with the new rooms array
    setRooms(updatedRooms);
    updateRoomsqty(updatedRooms);
  };

  const removeChildGuest = (event, index) => {
    event.preventDefault();
    // Create a copy of the rooms array
    const updatedRooms = [...rooms];

    // Ensure that the number of adults doesn't go below 0
    updatedRooms[index].children = Math.max(
      updatedRooms[index].children - 1,
      0
    );

    const childAgeArrayLength = Object.keys(
      updatedRooms[index].child_age
    ).length;

    if (childAgeArrayLength > 0) {
      delete updatedRooms[index].child_age[childAgeArrayLength - 1];
      setRooms(updatedRooms);
    }

    // Update state with the new rooms array
    setRooms(updatedRooms);
    updateRoomsqty(updatedRooms);
  };

  // Function to toggle the visibility of a specific div
  const toggleVisibility = (divId) => {
    // setDivVisibility((prevVisibility) => ({
    //   ...prevVisibility,
    //   [divId]: !prevVisibility[divId] || false,
    // }));

    setDivVisibility((prevdivVisibility) =>
      prevdivVisibility === divId ? null : divId
    );
  };




  

  return (
    <div className="room-guest-content">
      {rooms.map((room, index) => (
        <div key={index}>
          <div className="room-no-div" onClick={() => toggleVisibility(index)}>
            <div className="room-no">Room {index + 1}</div>
            <a
              href="#"
              type="button"
              onClick={(e) => removeRoom(e, index)}
              className={`remove-btn ${index === 0 ? "invisible" : ""}`}
            >
              Remove
            </a>
          </div>

          <div className={divVisibility == index ? "visible" : "hidden"}>
            <div className="adult-div">
              <div>Adults</div>
              <div className="guest-quantity-div">
                <a href="#" onClick={(e) => removeAdultGuest(e, index)}>
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
                  readOnly
                ></input>
                <a href="#" onClick={(e) => addAdultGuest(e, index)}>
                  <img className="plus-icon" src={Plus}></img>
                </a>
              </div>
            </div>

            <div className="child-div">
              <div>Child</div>
              <div className="guest-quantity-div">
                <a href="#" onClick={(e) => removeChildGuest(e, index)}>
                  <img className="minus-icon" src={Minus}></img>
                </a>
                <input
                  className="adult-quantity"
                  type="number"
                  onChange={(e) =>
                    updateGuests(index, "children", parseInt(e.target.value))
                  }
                  value={room.children}
                  readOnly
                ></input>
                <a href="#" onClick={(e) => addChildGuest(e, index)}>
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
                      {/* <select
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
                      </select> */}

<select
          className="childage-select-box childage"
          // value={childAge} // Bind the value correctly
          onChange={(e) =>
            updateGuests(
              index,
              Childindex,
              parseInt(e.target.value)
            )
          }
        >
          {[1, 2, 3, 4, 5, 6].map((age) => (
            <option key={age} value={age}>
              {age}
            </option>
          ))}
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
