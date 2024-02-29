import { useState } from "react";
import LightGallery from 'lightgallery/react';

// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

// If you want you can use SCSS instead of css
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import "./HotelDetails.css";
import Hotel1 from "../../../assets/hotel-img/hotel1.png";
import Hotel3 from "../../../assets/hotel-img/hotel3.png";
import Hotel4 from "../../../assets/hotel-img/hotel4.png";
import Hotel9 from "../../../assets/hotel-img/hotel9.png";
import Hotel7 from "../../../assets/hotel-img/hotel7.png";
import MapPin from "../../../assets/icons/map-pin.svg";
import Rating from "../../../assets/icons/star-fill.svg";
import TotalNumberIcon from "../../../assets/icons/size.svg";
import TickCircle from "../../../assets/icons/tick-circle.svg";
import CopyIcon from "../../../assets/icons/copy-icon.svg";
import ShareIcon from "../../../assets/icons/share-icon.svg";
import DoubleUser from "../../../assets/icons/double-user.svg";
import BedIcon from "../../../assets/icons/bed-icon.svg";
import SingleUser from "../../../assets/icons/user.svg";
import DiscountIcon from "../../../assets/icons/discount-shape.svg";
import PlusIcon from "../../../assets/icons/plus.svg";
import MinusIcon from "../../../assets/icons/minus.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import ArrowDown from "../../../assets/icons/arrow-down.svg";
import Time from "../../../assets/icons/Time.svg";
import Payment from "../../../assets/icons/Payment.svg";
import Pet from "../../../assets/icons/Pet.svg";
import Bkash from "../../../assets/icons/bkash.svg";
import Dbbl from "../../../assets/icons/dbbl.svg";
import Visa from "../../..//assets/icons/visa.svg";
import Nagad from "../../../assets/icons/nagad.svg";

const HotelDetails = () => {

    const [counter, setCounter] = useState(1);

    // Function to handle increment
    const handleIncrement = () => {
      setCounter(counter + 1);
    };
  
    // Function to handle decrement
    const handleDecrement = () => {

        if (counter > 1) {
            setCounter(counter - 1);
        }
    };

    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    return (
        <div className='custom-container py-[20px]'>
         
            <div className='hotel-information-details'>
           
            <div className='iamge-gallery-div'>
            <LightGallery 
                onInit={onInit}
                speed={500}
                plugins={[lgThumbnail, lgZoom]}
            >
                
               
                <a href={Hotel1} className='hotels-large-image-link'>
                    <img src={Hotel1} className='hotel-large-image'></img>
                </a>
                <a href={Hotel3} className='hotels-small-images'>
                    <img src={Hotel3} className='hotel-small-image'></img>
                </a>
                <a href={Hotel4} className='hotels-small-images'>
                    <img src={Hotel4} className='hotel-small-image'></img>
                </a>
                <a href={Hotel9} className='hotels-small-images'>
                    <img src={Hotel9} className='hotel-small-image'></img>
                </a>
                <a href={Hotel7} className='hotels-small-images'>
                    <img src={Hotel7} className='hotel-small-image'></img>
                </a>
                </LightGallery>

                </div>
                  

                    <div className='hotel-info-division'>
                        <div className='hotel-info-with-price'>
                                <div>
                                    <div>
                                        <span className='property-type'>Hotels</span>
                                    </div>

                                    <div className='flex gap-x-2 mt-[5px]'>
                                        <div className='property-name'>
                                            Hotel Sea View
                                        </div>
                                        <div >
                                            <span className='chuty-property-id'>
                                                    CR000002CX
                                            </span>
                                        </div>
                                    </div>

                                    <div className='flex gap-x-2'>
                                        <img src={MapPin}></img>
                                        <div className='location-name'>Cox's Bazar</div>
                                    </div>

                                    <div className='flex mt-[5px]'>
                                        <div className='flex'>
                                            <img className='star-rating-icon' src={Rating}></img>
                                            <img className='star-rating-icon' src={Rating}></img>
                                            <img className='star-rating-icon' src={Rating}></img>
                                            <img className='star-rating-icon' src={Rating}></img>
                                            <img className='star-rating-icon' src={Rating}></img>
                                        </div>
                                        <div>
                                            4.8 (21 Reviews)
                                        </div>
                                    </div>


                                    <div className='flex gap-x-1  mt-[5px]'>
                                        <img className='common-icon' src={TotalNumberIcon}></img>
                                        <div>Room Number 40</div>
                                    </div>

                                    <div className='flex gap-x-1  mt-[5px]'>
                                        <img className='common-icon' src={TotalNumberIcon}></img>
                                        <div>Floor 30</div>
                                    </div>
                                </div>

                                <div  className=' mt-[5px]'>
                                    <div className='hotel-regular-price'>BDT 5000</div>
                                    <div className='chuty-offer-price'>BDT 2300</div>
                                    <div className=' mt-[5px]'>1 Room, Per Night</div>
                                </div>

                        </div>

                      


                        <div className='grid gap-[6px]' >
                            <div className='facility'>Facilities</div>
                            <div className='facility-division'>
                            <div className='flex gap-x-1'>
                                <img className='common-icon' src={TickCircle} alt="" />
                                <div>Wifi</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img className='common-icon' src={TickCircle} alt="" />
                                <div>Restaurent</div>
                            </div>
                            </div>
                        </div>
                        
                    </div>
            </div>

            <div className='hotel-info-menu-list'>
                <a>Description</a>
                <a>Caregories of Rooms</a>
                <a>Facilities</a>
                <a>Policy</a>
                <a>Ratings & Reviews</a>
            </div>

        <div className='room-with-price-overview-division'>
            <div>
                <div className='room-info-and-picture'>
                    <div className='room-details'>
                        <div className='room-information'>
                            <div className='flex gap-x-[100px]'>
                                <div className='room-name'>Premium Suite</div>
                                <div className='flex '>
                                    <img src={CopyIcon}></img>
                                    <img src={ShareIcon}></img>
                                </div>
                            </div>
                            <a className='room-details-button'>Room Details</a>

                            <div className='grid gap-y-2 mt-[10px]'>
                            <div className='flex  gap-x-1'>
                                <img src={DoubleUser} alt="" />
                                <div>2 Adults , 1 Child</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={BedIcon} alt="" />
                                <div>2 Twin Beds</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={SingleUser} alt="" />
                                <div>2 Max People</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={TotalNumberIcon} alt="" />
                                <div>Room Size: 17 sq. ft</div>
                            </div>

                            <div className='hurry-up-message'>Hurry up only 8 rooms left</div>

                            <div className='flex space-x-2'>
                                <div className='flex gap-x-1'>
                                <img className='common-icon' src={TickCircle} alt="" />
                                <div>Wifi</div>
                                </div>
                                
                                <div className='flex gap-x-1'>
                                    <img className='common-icon' src={TickCircle} alt="" />
                                    <div>Restaurent</div>
                                </div>

                                <a className='more-btn'>More+</a>
                            </div>
                            </div>
                            </div>
                        <div className='room-image-slider'>
                            <img src={Hotel1} className='room-image'></img>
                        </div>
                    </div>

                    <div className="room-section-horizontal-row"></div>

                    <div className='room-price-quantity-select'>
                        <div className='flex space-x-5'>
                            <div className='flex space-x-2 items-center'>
                                <div className='chuty-offer-price'>BDT 2300</div>
                                <div className='rooms-regular-price mt-[1px]'>BDT 5000</div>
                            </div>
                            <div className='flex items-center'>
                                <img src={DiscountIcon} className='discount-icon'></img>
                                <div className='discount-ratio mt-[1px]'>50% off</div>
                            </div>
                        </div>
                        <div className='flex space-x-2 mt-2'>
                            <div className='room-quantity'>
                                <img src={MinusIcon} onClick={handleDecrement}></img>
                                <input className='room-quantity-field' value={counter}></input>
                                <img src={PlusIcon} onClick={handleIncrement}></img>
                            </div>

                            <button className='select-room-button'>Select</button>
                        </div>
                    </div>

                </div>



                <div className='room-info-and-picture'>
                    <div className='room-details'>
                        <div className='room-information'>
                            <div className='flex gap-x-[100px]'>
                                <div className='room-name'>Premium Suite</div>
                                <div className='flex '>
                                    <img src={CopyIcon}></img>
                                    <img src={ShareIcon}></img>
                                </div>
                            </div>
                            <a className='room-details-button'>Room Details</a>

                            <div className='grid gap-y-2 mt-[10px]'>
                            <div className='flex  gap-x-1'>
                                <img src={DoubleUser} alt="" />
                                <div>2 Adults , 1 Child</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={BedIcon} alt="" />
                                <div>2 Twin Beds</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={SingleUser} alt="" />
                                <div>2 Max People</div>
                            </div>
                            <div className='flex gap-x-1'>
                                <img src={TotalNumberIcon} alt="" />
                                <div>Room Size: 17 sq. ft</div>
                            </div>

                            <div className='hurry-up-message'>Hurry up only 8 rooms left</div>

                            <div className='flex space-x-2'>
                                <div className='flex gap-x-1'>
                                <img className='common-icon' src={TickCircle} alt="" />
                                <div>Wifi</div>
                                </div>
                                
                                <div className='flex gap-x-1'>
                                    <img className='common-icon' src={TickCircle} alt="" />
                                    <div>Restaurent</div>
                                </div>

                                <a className='more-btn'>More+</a>
                            </div>
                            </div>
                            </div>
                        <div className='room-image-slider'>
                            <img src={Hotel1} className='room-image'></img>
                        </div>
                    </div>

                    <div className="room-section-horizontal-row"></div>

                    <div className='room-price-quantity-select'>
                        <div className='flex space-x-5'>
                            <div className='flex space-x-2 items-center'>
                                <div className='chuty-offer-price'>BDT 2300</div>
                                <div className='rooms-regular-price mt-[1px]'>BDT 5000</div>
                            </div>
                            <div className='flex items-center'>
                                <img src={DiscountIcon} className='discount-icon'></img>
                                <div className='discount-ratio mt-[1px]'>50% off</div>
                            </div>
                        </div>
                        <div className='flex space-x-2 mt-2'>
                            <div className='room-quantity'>
                                <img src={MinusIcon} onClick={handleDecrement}></img>
                                <input className='room-quantity-field' value={counter}></input>
                                <img src={PlusIcon} onClick={handleIncrement}></img>
                            </div>

                            <button className='select-room-button'>Select</button>
                        </div>
                    </div>

                </div>
                
            </div>
            <div>
            <div className="pricing-overview-title">Pricing Overview</div>
            <div className='pricing-overview-division'>
                   
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
                    </div>


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
                    </div>

                    <button className="reserve-button">Reserve</button>
            </div>
            </div>
                
        </div>


        <div className="facilities-container">
            <div className="facility">Facilities</div>
            <div>
                <div className="facility">General</div>
                <div className="flex space-x-[50px]">
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

            <div>
                <div className="facility">Parking</div>
                <div className="flex space-x-[100px]">
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


        <div className="policy-container">
            <div className="policy-title">Policy</div>
            <div className="property-policy-component">
            <div className="grid space-y-[10px]">
                <div className="flex space-x-1">
                    <img className="policy-image" src={Time}></img>
                    <div>CheckIn</div>
                </div>
                <div className="flex space-x-1">
                    <img className="policy-image" src={Time}></img>
                    <div>CheckOut</div>
                </div>
                <div className="flex space-x-1">
                    <img className="policy-image" src={DoubleUser}></img>
                    <div className="whitespace-nowrap">Child Policy</div>
                </div>
                <div className="flex space-x-1">
                    <img className="policy-image" src={Pet}></img>
                    <div>Pet Policy</div>
                </div>
                <div className="flex space-x-1">
                    <img className="policy-image" src={TickCircle}></img>
                    <div>Instruction</div>
                </div>
                <div className="flex space-x-1">
                    <img className="policy-image" src={Payment}></img>
                    <div>Payment</div>
                </div>
            </div>
            <div className="grid space-y-[10px]">
                <div className="font-semibold">12PM</div>
                <div className="font-semibold">11AM</div>
                <div>Extra Child Not Available</div>
                <div>Not Allowed</div>
                <div>Alhohol Prohibited</div>
                <div className="flex space-x-[5px]">
                    <img className="payment-icon" src={Bkash}></img>
                    <img className="payment-icon" src={Nagad}></img>
                    <img className="payment-icon" src={Dbbl}></img>
                    <img className="payment-icon" src={Visa}></img>
                </div>
            </div>
            
            </div>
        </div>


        <div className="ratings-review-container">
            <div className="review-rating-division">
                <div className="font-semibold rating-title"> Ratings & Review</div>
                <div className="flex space-x-2">
                    <img src={Rating}></img>
                    <div>5</div>
                    <progress value="50" max="100"></progress>
                </div>
                <div className="flex space-x-2">
                    <img src={Rating}></img>
                    <div>4</div>
                    <progress value="30" max="100"></progress>
                </div>
                <div className="flex space-x-2">
                    <img src={Rating}></img>
                    <div>3</div>
                    <progress value="10" max="100"></progress>
                </div>
                <div className="flex space-x-2">
                    <img src={Rating}></img>
                    <div>2</div>
                    <progress value="45" max="100"></progress>
                </div>
                <div className="flex space-x-2">
                    <img src={Rating}></img>
                    <div>1</div>
                    <progress value="17" max="100"></progress>
                </div>
            </div>

            <div className="service-rating">
                <button className="star-rating-btn">
                        <img src={Rating}></img>
                        <div>4</div>
                </button>

                <div className="font-semibold">Good Service </div>
                <div className="mx-3">29 Rating</div>
            </div>

        </div>



        <div>
            
        </div>

        


        </div>
    );
};

export default HotelDetails;