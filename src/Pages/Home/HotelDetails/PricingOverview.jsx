import React from 'react';
import ArrowDown from "../../../assets/icons/arrow-down.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";


const PricingOverview = () => {
    return (
        <div>

        
        <div className='pricing-overview-division'>
        <div className="pricing-overview-title">Pricing Overview</div>
              <div className="room-wise-price-details mt-[10px]">
                            <div className=" px-[15px] py-[15px] bg-[#F8FEFF]">
                            <div className=" room-name-guest-details flex space-x-10">
                                <div>
                                    <div className="room-name">Premium Suite</div>
                                    <div>2 Max People</div>
                                </div>
                                <img src={DeleteIcon}></img>
                            </div>

                            <div className="price-horizontal-row"></div>

                            <div className="flex space-x-5 mt-[5px]">
                                <div>
                                    <div>Extra Adult</div>
                                    <div className="relative">
                                    <select className="number-of-guest  pl-[10px]">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4 </option>
                                    </select>

                                    <img className="arrow-icon-guest-quantity" src={ArrowDown}></img>

                                    </div>
                                </div>

                                <div>
                                    <div>Extra Child</div>
                                    <div className="relative ">
                                    <select className="number-of-guest  pl-[10px]">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4 </option>
                                    </select>

                                    <img className="arrow-icon-guest-quantity" src={ArrowDown}></img>

                                    </div>
                                </div>
                            </div>

                            <div className="price-horizontal-row"></div>

                            <div className="extra-guest-bed-info">
                                <div>Extra Guest</div>
                                <div>0 Adult , 0 Child</div>
                            </div>

                            <div className="extra-guest-bed-info">
                                <div>Room Price</div>
                                <div>BDT 2300</div>
                            </div>

                            <div className="extra-guest-bed-info">
                                <div>Extra Bed</div>
                                <div>BDT 1000</div>
                            </div>
                        </div>    
                    </div>

{/* 
                    <div className="room-wise-price-details mt-[10px]">
                            <div className=" px-[30px] py-[15px] bg-[#F8FEFF]">
                            <div className=" room-name-guest-details flex space-x-10">
                                <div>
                                    <div className="room-name">Premium Suite</div>
                                    <div>2 Max People</div>
                                </div>
                                <img src={DeleteIcon}></img>
                            </div>

                            <div className="price-horizontal-row"></div>

                            <div className="flex space-x-5 mt-[5px]">
                                <div>
                                    <div>Extra Adult</div>
                                    <div className="relative ">
                                    <select className="number-of-guest  pl-[10px]">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4 </option>
                                    </select>

                                    <img className="arrow-icon-guest-quantity" src={ArrowDown}></img>

                                    </div>
                                </div>

                                <div>
                                    <div>Extra Child</div>
                                    <div className="relative ">
                                    <select className="number-of-guest  pl-[10px]">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4 </option>
                                    </select>

                                    <img className="arrow-icon-guest-quantity" src={ArrowDown}></img>

                                    </div>
                                </div>
                            </div>

                            <div className="price-horizontal-row"></div>

                            <div className="extra-guest-bed-info">
                                <div>Extra Guest</div>
                                <div>0 Adult , 0 Child</div>
                            </div>

                            <div className="extra-guest-bed-info">
                                <div>Room Price</div>
                                <div>BDT 2300</div>
                            </div>

                            <div className="extra-guest-bed-info">
                                <div>Extra Bed</div>
                                <div>BDT 1000</div>
                            </div>
                        </div>    
                    </div> */}

                    <div className="reserve-button">Reserve</div>
                </div>
        </div>
    );
};

export default PricingOverview;