import React from 'react';
import {useState} from 'react';
import './RoomGuest.css'
import Plus from './../../../../../assets/icons/plus.svg'
import Minus from './../../../../../assets/icons/minus.svg'
import GreenAddIcon from './../../../../../assets/icons/Add-circle-green.svg'


const RoomGuest = () => {



    const [divCount, setDivCount] = useState(1);
    const [inputValue, setInputValue] = useState(1);

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const addDiv = () => {
      setDivCount(prevCount => prevCount + 1);
    };
    return (
    
        <div className='room-guest-content' >
               {[...Array(divCount)].map((_, index) => ( 
            <div key={index}>
          <div className='room-no-div'>
                <div className='room-no'>Room {index+1}</div>
                <div className='remove-bth'> Remove</div>
          </div>
          
          <div className='adult-div'>
            <div>Adults</div>
            <div className='guest-quantity-div'>
                <a><img className='minus-icon' src={Minus}></img></a>
               <input className='adult-quantity' type='number' value={inputValue}
          onChange={handleInputChange}></input>
                <a><img className='plus-icon' src={Plus}></img></a>
            </div>
            </div>


            <div className='adult-div'>
            <div>Child</div>
            <div className='guest-quantity-div'>
                <a><img className='minus-icon' src={Minus}></img></a>
               <input className='adult-quantity' type='number' value={inputValue}
          onChange={handleInputChange}></input>
                <a><img className='plus-icon' src={Plus}></img></a>
            </div>
            </div>
            </div>
            ))}

            <div className='btn-div'>
                <a className='addroom-btn' onClick={addDiv}>
                    <img src={GreenAddIcon}></img>
                    <p>Add Room</p>
                </a>
                <a className='done-btn'>Done</a>
            </div>
        </div>


    );
};

export default RoomGuest;