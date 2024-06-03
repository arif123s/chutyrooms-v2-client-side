import React from 'react';
import DoubleUser from "../../../assets/icons/double-user.svg";
import BedIcon from "../../../assets/icons/bed-icon.svg";
import SingleUser from "../../../assets/icons/user.svg";
import CopyIcon from "../../../assets/icons/copy-icon.svg";
import TickCircle from "../../../assets/icons/tick-circle.svg";

const RoomDetails = () => {
    return (
        <div className='room-details-content'>
            <div className='font-semibold'>Premium Suite </div>
            <div className='flex space-x-1'>
                <img src={DoubleUser}></img>
                <div>2 Adults , 1 Child</div>
            </div>

            <div className='flex space-x-1'>
            <img src={BedIcon}></img>
                <div>2 Double Bed</div>
            </div>
            <div className='flex space-x-1'>
                <img src={SingleUser}></img>
                <div>2 Max People</div>
            </div>
            <div className='flex space-x-1'>
                <img src={CopyIcon}></img>
                <div>Room Size: 250 sqft</div>
            </div>

            <div className="room-section-horizontal-row"></div>

            
            <div>
                    <div className="font-semibold">Facilities</div>
                    <div className="grid gap-y-[5px]">
                        <div className="font-semibold">General</div>
                        <div className="flex space-x-[10px]">
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">Wifi</div>
                            </div>
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">CCTV</div>
                            </div>
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">Restautent</div>
                            </div>
                        </div>
                    </div>

                    <div  className="grid gap-y-[5px]">
                        <div className="font-semibold">Parking</div>
                        <div className="flex space-x-[10px]">
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">Car Parking</div>
                            </div>
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">Bike Parking</div>
                            </div>
                            <div className="flex space-x-1">
                                <img src={TickCircle}></img>
                                <div className="amenities">Restautent</div>
                            </div>
                        </div>
                    </div>
                </div>
          
        </div>
    );
};

export default RoomDetails;