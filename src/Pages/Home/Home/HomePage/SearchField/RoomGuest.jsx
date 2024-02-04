import React from 'react';
import { useState } from 'react';
import Select from '@mui/material/Select';
import './RoomGuest.css'
import Plus from './../../../../../assets/icons/plus.svg'
import Minus from './../../../../../assets/icons/minus.svg'
import GreenAddIcon from './../../../../../assets/icons/Add-circle-green.svg'
import ArrowDown from './../../../../../assets/icons/arrow-down.svg'


const RoomGuest = ({ isDivClicked, setDivClicked }) => {



  const [divCount, setDivCount] = useState(1);
  const [adultNumber, setInputValue] = useState([1]);
  const [childNumber, setChildNumber] = useState([0]);

  //select Box state

  const [selectCount, setSelectCount] = useState([0]);
  // const [selectedValues, setSelectedValues] = useState(['']);

  // const handleInputChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  const addDiv = () => {
    if (divCount < 4) {
      setDivCount(prevCount => prevCount + 1);
      setInputValue(prevValues => {
        // alert(prevValues)
        const newValues = [...prevValues]; // Create a shallow copy of the array
        newValues[divCount] = 1; // Update the value at the specified index
        return newValues; // Set the new array as the state
      })

      setChildNumber(prevValues => {
        // alert(prevValues)
        const newValues = [...prevValues]; // Create a shallow copy of the array
        newValues[divCount] = 0; // Update the value at the specified index
        return newValues; // Set the new array as the state
      })
    }
  };


  const updateAdultInputValue = (index, newValue) => {
    setInputValue(prevValues => {
      // alert(prevValues)
      const newValues = [...prevValues]; // Create a shallow copy of the array
      newValues[index] = newValue; // Update the value at the specified index
      return newValues; // Set the new array as the state
    });
  };


  const updateChildInputValue = (index, newValue) => {
    setChildNumber(prevValues => {
      // alert(prevValues)
      const newValues = [...prevValues]; // Create a shallow copy of the array
      newValues[index] = newValue; // Update the value at the specified index
      return newValues; // Set the new array as the state
    });
  };

  const plusAdult = (index) => {
    updateAdultInputValue(index, String(parseInt(adultNumber[index]) + 1));
  }

  const minusAdult = (index) => {
    updateAdultInputValue(index, String(parseInt(adultNumber[index]) - 1));
  }

  const plusChild = (index) => {
    updateChildInputValue(index, String(parseInt(childNumber[index]) + 1));
    // setSelectCount(selectCount + 1);
    // console.log(parseInt(childNumber[index]) + 1);
    const newChildNumber = parseInt(childNumber[index]) + 1;
    setSelectCount(prevValues => {
      // alert(prevValues)
      const newValues = [...prevValues]; // Create a shallow copy of the array
      newValues[index] = newChildNumber; // Update the value at the specified index
      return newValues; // Set the new array as the state
    });
    // setSelectedValues([...selectedValues, '']);
  }

  const minusChild = (index) => {
    updateChildInputValue(index, String(parseInt(childNumber[index]) - 1));

    // setSelectCount(selectCount - 1);
    // setSelectedValues(selectedValues.slice(0, -1));

    const newChildNumber = parseInt(childNumber[index]) - 1;
    setSelectCount(prevValues => {
      // alert(prevValues)
      const newValues = [...prevValues]; // Create a shallow copy of the array
      newValues[index] = newChildNumber; // Update the value at the specified index
      return newValues; // Set the new array as the state
    });

  }


  const [isContentVisible, setIsContentVisible] = useState(false);

  const toggleContent = () => {
    setIsContentVisible(!isContentVisible);
  };


  // const handleSelectChange = (index, value) => {
  //   const newSelectedValues = [...selectedValues];
  //   newSelectedValues[index] = value;
  //   setSelectedValues(newSelectedValues);
  // };

  const RoomGuestRemoveItem = (index) => {
    
    index.splice(index, 1);
    setItems(newItems);
  };










  return (

    <div className='room-guest-content' >
      {[...Array(divCount)].map((_, index) => (
        <div key={index} onClick={toggleContent}>
          <div className='room-no-div'>
            <div className='room-no'>Room {index + 1}</div>
            <a type='button' className='remove-btn' onClick={() => RoomGuestRemoveItem(index)}> Remove</a>
          </div>

          <div>
            <div className='adult-div'>
              <div>Adults</div>
              <div className='guest-quantity-div'>
                <a onClick={(e) => minusAdult(index)}><img className='minus-icon' src={Minus}></img></a>
                <input className='adult-quantity' id={`adult-quantity-${index}`} type='number' value={adultNumber[index]}
                  onChange={(e) => updateAdultInputValue(index, e.target.value)}></input>
                <a onClick={(e) => plusAdult(index)}><img className='plus-icon' src={Plus}></img></a>
              </div>
            </div>

            <div className='child-div'>
              <div>Child</div>
              <div className='guest-quantity-div'>
                <a onClick={(e) => minusChild(index)}><img className='minus-icon' src={Minus}></img></a>
                <input className='adult-quantity' type='number' onChange={(e) => updateChildInputValue(index, e.target.value)} value={childNumber[index]}
                ></input>
                <a onClick={(e) => plusChild(index)}><img className='plus-icon' src={Plus}></img></a>
              </div>
            </div>
        <div className='childage-selection'>
            {Array.from({ length: selectCount[index] }).map((_, Childindex) => (
              <div >
                {/* {(index == Childindex) ?
                  ( */}
                    <div key={Childindex} className='childage'>
                      <select className='childage-select-box' onChange={(e) => handleSelectChange(Childindex, e.target.value)}
                        displayEmpty >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>


                    </select>

                    <img className='arrow-icon-down' src={ArrowDown}></img>
                    </div>
                    {/* ) : (<div></div>)}*/}
              </div>
            ))}

    </div>
            {/* ))} */}
          </div>
        </div>
      ))}

      <div className='btn-div'>
        <a className='addroom-btn' onClick={addDiv}>
          <img src={GreenAddIcon}></img>
          <p>Add Room</p>
        </a>
        <a onClick={() => setDivClicked(!isDivClicked)} className='done-btn'>Done</a>
      </div>
    </div>


  );
};

export default RoomGuest;