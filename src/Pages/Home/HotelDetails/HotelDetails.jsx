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

import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import "./HotelDetails.css";
import Hotel1 from "../../../assets/hotel-img/hotel1.png";
import Hotel3 from "../../../assets/hotel-img/hotel3.png";
import Hotel4 from "../../../assets/hotel-img/hotel4.png";
import Hotel9 from "../../../assets/hotel-img/hotel9.png";
import Hotel7 from "../../../assets/hotel-img/hotel7.png";
import MapPin from "../../../assets/icons/map-pin.svg";
import Rating from "../../../assets/icons/star-fill.svg";
import RatingStartBlank from "../../../assets/icons/star-blank.svg";
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
import UserBackground from "../../../assets/icons/user-background-icon.svg";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import Loading from "../../Common/Includes/Loading/Loading";
import PricingOverview from "./PricingOverview";
import RoomDetails from "./RoomDetails";
import { useGetSingleHotelQuery } from "../../../redux/features/HotelDetails/hotelDetails.api";
import { useLocation } from "react-router-dom";
// import { useGetAllSearchResultHotelsQuery } from "../../../redux/features/searchProperty/searchResultHotel.api";
// import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];
const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "8px",
};

const HotelDetails = () => {

    const [counters, setCounters] = useState({});
    const [mapView, setMapView] = useState(false);
    const [color, setColor] = useState(false);
    const [center, setCenter] = useState({
        lat: 23.862725477930507,
        lng: 90.40080333547479,
    });

    const [modalId, setModalId] = useState(null);


    // const [counters, setCounters] = useState(
    //     rooms.reduce((acc, room) => {
    //       acc[room.room_id] = 1; // Assuming the initial counter for each room is 1
    //       return acc;
    //     }, {})
    //   );
    // const location = useLocation();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    console.log(searchParams);


    const searchInfo = {
        // location: "Motel Six Sharnali",
        // search_type: "property",
        // location_id: 2,
        // check_in: "2024/06/01",
        // check_out: "2024/06/02",
        // rooms: 2,
        // adult_guest: 1,
        // child_guest: 1,
        // child_age: 1,
        // guest_session_id: "",

    location: searchParams.get("location"),
    search_type: searchParams.get("search_type"),
    location_id: parseInt(searchParams.get("location_id")),
    check_in: searchParams.get("check_in"),
    check_out: searchParams.get("check_out"),
    rooms: parseInt(searchParams.get("rooms")),
    adult_guest: parseInt(searchParams.get("adult_guest")),
    child_guest: parseInt(searchParams.get("child_guest")),
    child_age: parseInt(searchParams.get("child_age")),
    guest_session_id: searchParams.get("guest_session_id"),
      };
    
    //   console.log(searchInfo);
    
      const {
        data: searchData,
        error,
        isLoading,
      } = useGetSingleHotelQuery(searchInfo);

      console.log(searchData);
      
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: "AIzaSyDvhGL9yHeg55wvR1olWnMfdtDa-JdRMyY",
        libraries,
    });

    if (loadError) {
        return <div className="text-center py-[60px]">Error loading maps!</div>;
    }

    if (!isLoaded) {
        return <Loading></Loading>;
    }

    // Function to handle increment
    // const handleIncrement = (roomId) => {
        
    //     setCounter(counter + 1);
    // };

    // // Function to handle decrement
    // const handleDecrement = () => {

    //     if (counter > 1) {
    //         setCounter(counter - 1);
    //     }
    // };

    const handleIncrement = (roomId) => {
        setCounters((prevCounters) => ({
            ...prevCounters,
            [roomId]: (prevCounters[roomId] || 1) + 1,
        }));
    };

    const handleDecrement = (roomId) => {
        setCounters((prevCounters) => {
            const currentCounter = prevCounters[roomId] || 1;
            return {
                ...prevCounters,
                [roomId]: currentCounter > 1 ? currentCounter - 1 : 1,
            };
   
        });

    }
 
   
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };


    const lists = [
        {
            name: 'Description', id: 'description',
        },
        {
            name: 'Caregories of rooms', id: 'CaregoriesOfRooms',
        },
        {
            name: 'Facilities', id: 'facilities',
        },

        {
            name: 'Policy', id: 'policy',
        },
        {
            name: 'Ratings & Review', id: 'ratingReview',
        },


    ];


    const ColorHandleClick = (color) => {
        // alert(color);
        setColor(color);
    }

    const modalOpen = () => {

       
      
        // setModalId();
        document.getElementById("Room-details-modal").showModal();
    };
    return (
        <div className='custom-container py-[20px]'>
            <div className="hotel-details-section">

                <div className='hotel-information-details'>

                    <div className='iamge-gallery-div relative'>
                        <LightGallery
                            onInit={onInit}
                            speed={500}
                            plugins={[lgThumbnail, lgZoom]}
                        >

                    <a href={searchData?.data?.hotels_data?.property_image[0].url} className='hotels-large-image-link'>
                        <img src={searchData?.data?.hotels_data?.property_image[0].url} className='hotel-large-image'></img>
                    </a>


                {searchData?.data?.hotels_data?.property_image?.map((img, index) => (
                    <a href={img.url} className='hotels-small-images'>
                        <img src={img.url} className='hotel-small-image'></img>
                    </a>
                ))}
{/* 
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
                            </a> */}
                        </LightGallery>

                        <button className="number-of-image">1/5</button>

                    </div>
                    


                    <div className='hotel-info-division'>
                        <div className='hotel-info-with-price'>
                            <div>
                                <div>
                                    <span className='property-type'>Hotels</span>
                                </div>

                                <div className='flex gap-x-2 mt-[5px]'>
                                    <div className='property-name'>
                                        {searchData?.data?.hotels_data.property_name}
                                    </div>
                                    <div >
                                        <span className='chuty-property-id'>
                                            CR000002CX
                                        </span>
                                    </div>
                                </div>

                                <div className='flex gap-x-2'>
                                    <img src={MapPin}></img>
                                    <div className='location-name'>{searchData?.data?.hotels_data.area},{searchData?.data?.hotels_data.district}</div>
                                </div>

                                <div className='flex mt-[5px] space-x-[4px]'>
                                    <div className='flex space-x-[3px]'>
                                        <img className='star-rating-icon' src={Rating}></img>
                                        <img className='star-rating-icon' src={Rating}></img>
                                        <img className='star-rating-icon' src={Rating}></img>
                                        <img className='star-rating-icon' src={Rating}></img>
                                        <img className='star-rating-icon' src={Rating}></img>
                                    </div>
                                    <div>
                                    {searchData?.data?.hotels_data.hotel_class}
                                    </div>
                                </div>


                                <div className='flex gap-x-1  mt-[5px]'>
                                    <img className='common-icon' src={TotalNumberIcon}></img>
                                    <div>Number of Rooms {searchData?.data?.hotels_data.number_of_rooms}</div>
                                </div>

                                <div className='flex gap-x-1  mt-[5px]'>
                                    <img className='common-icon' src={TotalNumberIcon}></img>
                                    <div> Number of Floors{searchData?.data?.hotels_data.number_of_floors}</div>
                                </div>
                            </div>

                            <div className=' mt-[5px]'>
                                <div className='hotel-regular-price'>BDT {searchData?.data?.hotels_data.rooms_regular_price}</div>
                                <div className='chuty-offer-price'>BDT {searchData?.data?.hotels_data.rooms_website_users_price}</div>
                                <div className=' mt-[5px]'>1 Room, Per Night</div>
                            </div>

                        </div>




                        <div className='grid gap-x-[5px] gap-y-[5px] mt-[5px]' >
                            <div className='facility'>Facilities</div>
                            <div className='facility-division'>
                                {searchData?.data?.hotels_data?.amenities?.map((amenities) => (
                                <div className='flex gap-x-1'>
                                    <img className='common-icon' src={TickCircle} alt="" />
                                        <div>{amenities.name}</div>
                                </div>
                                    ))}
                            </div>
                        </div>

                    </div>
                </div>

                <div className='hotel-info-menu-list'>
                    {lists.map((list, i) =>

                        <a key={i}   href={`#${list.id}`} onClick={() => ColorHandleClick(list.name)} className={`${color == list.name ? 'onclick-setcolor' : 'onclicksetcancel-color'}`}>{list.name}</a>
                    )}


                </div>
               
                <div className="hotel-description" id="description">
                    {searchData?.data?.hotels_data.property_description}
                </div>
                

                <div className='relative room-with-price-overview-division mt-[24px] z-1' id="CaregoriesOfRooms">
                    <div>

                    {searchData?.data?.hotels_data?.rooms?.map((room, index) => (

                                    <div className='room-info-and-picture'>
                                    <div className='room-details'>
                                        <div className='room-information'>
                                            <div className='room-name-with-icon'>
                                                <div className='room-name  break-words'>{room.room_name}</div>
                                                <div className='flex '>
                                                    <img className="common-icon" src={CopyIcon}></img>
                                                    <img className="common-icon" src={ShareIcon}></img>
                                                </div>
                                            </div>
                                          

                                            <div className='grid gap-y-2 mt-[10px]'>
                                                <div className='flex  gap-x-1'>
                                                    <img className="common-icon" src={DoubleUser} alt="" />
                                                    <div>{room.adult_guest_qty} Adults , {room.child_guest_qty} Child</div>
                                                </div>
                                                <div className='flex gap-x-1'>
                                                    <img className="common-icon" src={BedIcon} alt="" />
                                                    {room?.beds?.map((bed)=>
                                                        <div>{bed.qty} {bed.bed_name} beds</div>
                                                     )}
                                                    
                                                </div>
                                                <div className='flex gap-x-1'>
                                                    <img className="common-icon" src={SingleUser} alt="" />
                                                    <div>{room.max_guest} Max People</div>
                                                </div>
                                                <div className='flex gap-x-1'>
                                                    <img className="common-icon" src={TotalNumberIcon} alt="" />
                                                    <div>Room Size: {room.room_size}</div>
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
                                                    <button
                                                        onClick={() => modalOpen()}
                                                            >
                                                            <a className='more-btn'>More+</a>
                                                    </button>

                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className='room-image-slider'>
                                            
                                                <Swiper
                                                    slidesPerView={1}
                                                    spaceBetween={15}
                                                    navigation={true}
                                                    speed={1000}
                                                    modules={[Navigation]}
                                                    className="mySwiper rounded-[8px] "
                                                >

                                                    {room?.room_images?.map((room_image)=>
                                                     <SwiperSlide>
                                                        <img src={room_image.url} className='room-image'></img>
                                                    </SwiperSlide>
                                                    )}
                                                   
                                                </Swiper>
                                            

                                        </div>
                                    </div>

                                    <div className="room-section-horizontal-row"></div>

                                    <div className='room-price-quantity-select'>
                                        <div className='flex space-x-5'>
                                            <div className='flex space-x-2 items-center'>
                                                <div className='offer-price'>BDT {room.rooms_website_users_price}</div>
                                                <div className='rooms-regular-price mt-[1px]'>BDT {room.rooms_regular_price}</div>
                                            </div>
                                            <div className='flex items-center discount-content'>
                                                <img src={DiscountIcon} className='discount-icon'></img>
                                                <div className='discount-ratio mt-[1px]'>50% off</div>
                                            </div>
                                        </div>
                                        <div className='flex space-x-2 mt-2'>
                                            {/* <div className='room-quantity'>
                                                    <img
                                                        src={MinusIcon}
                                                        onClick={()=> handleDecrement(room.room_id)}
                                                        alt="Decrement"
                                                    />
                                                    <input
                                                        className='room-quantity-field'
                                                        value={counter}
                                                        readOnly
                                                    />
                                                    <img
                                                        src={PlusIcon}
                                                        onClick={()=> handleIncrement(room.room_id)}
                                                        alt="Increment"
                                                    />
                                            </div> */}

                                        <div className='room-quantity'>
                                                    <img
                                                        src={MinusIcon}
                                                        onClick={() => handleDecrement(room.room_id)}
                                                        alt="Decrement"
                                                    />
                                                    <input
                                                        className='room-quantity-field'
                                                        value={counters[room.room_id] || 1}
                                                        readOnly
                                                    />
                                                    <img
                                                        src={PlusIcon}
                                                        onClick={() => handleIncrement(room.room_id)}
                                                        alt="Increment"
                                                    />
                                                </div>

                                            <button className='select-room-button'>Select</button>
                                        </div>
                                    </div>

                                    </div>
                    ))}
                        
                    </div> 
                    <div className="pricing-section z-2 mt-[10px]">
                        <PricingOverview></PricingOverview>
                    </div>
                </div>


                <div className="facilities-container" id="facilities">
                    <div className="facility">Facilities</div>

                    {searchData?.data?.hotels_data?.facilities?.map((amenities_category) => 

                            <div className="grid gap-y-[5px]">
                            <div className="facility">{amenities_category.name}</div>
                            <div className="flex space-x-[10px]">

                                {amenities_category?.amenities?.map((amenities) => 

                                        <div className="flex space-x-1">
                                        <img src={TickCircle}></img>
                                        <div className="amenities">{amenities.name}</div>
                                        </div>
                                )}
                             
                            </div>
                            </div>

                    )}
                  

                   
                </div>

                <div className="policy-container space-y-4" id="policy">
                    <div className="policy-title">Policy</div>
                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image" src={Time}></img>
                            <div>CheckIn</div>
                        </div>
                        <div className="font-semibold">{searchData?.data?.hotels_data?.check_in_time} {searchData?.data?.hotels_data?.check_in_time_period}</div>
                    </div>

                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image" src={Time}></img>
                            <div>CheckOut</div>
                        </div>
                        <div className="font-semibold">{searchData?.data?.hotels_data?.check_out_time} {searchData?.data?.hotels_data?.check_out_time_period}</div>
                    </div>

                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image" src={DoubleUser}></img>
                            <div className="whitespace-nowrap">Child Policy</div>
                        </div>
                        <div className=""> Age Limit {searchData?.data?.hotels_data?.child_policy}</div>
                    </div>

                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image" src={Pet}></img>
                            <div>Pet Policy</div>
                        </div>
                        <div className="">{searchData?.data?.hotels_data?.pet_policy}</div>
                    </div>

                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image" src={TickCircle}></img>
                            <div>Instruction</div>
                        </div>
                        <div className="">{searchData?.data?.hotels_data?.instruction}</div>
                    </div>

                    <div className="grid grid-cols-4 ">
                        <div className="flex space-x-2">
                            <img className="policy-image mb-[25px]" src={Payment}></img>
                            <div>Payment</div>
                        </div>
                        <div className="flex">

                        {searchData?.data?.hotels_data?.payment_methods?.map((payment_method)=>
                            <img className="payment-method-icon" src={payment_method?.url}></img>
                        
                        )}
                                
                                {/* <img className="payment-method-icon" src={Nagad}></img>
                                <img className="payment-method-icon" src={Dbbl}></img>
                                <img className="payment-method-icon" src={Visa}></img> */}
                        </div>
                    </div>
                </div>



                {/* <div className="policy-container">
                    <div className="policy-title">Policy</div>
                    <div className="property-policy-component">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex space-x-5">
                                <div className="flex">
                                <img className="policy-image" src={Time}></img>
                                <div>CheckIn</div>
                                </div>
                               
                                <div className="font-semibold">12PM</div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="flex">
                                    <img className="policy-image" src={Time}></img>
                                    <div>CheckOut</div>
                                </div>
                                <div className="font-semibold">11AM</div>
                            </div>
                            <div className="flex space-x-5">
                            <div className="flex">
                                <img className="policy-image" src={DoubleUser}></img>
                                <div className="whitespace-nowrap">Child Policy</div>
                            </div>
                                <div className="">Extra Child Not Available</div>
                            </div>
                            <div className="flex space-x-5">
                            <div className="flex">
                                <img className="policy-image" src={Pet}></img>
                                <div>Pet Policy</div>
                            </div>
                                <div className="">Not Allowed</div>
                            </div>
                            <div className="flex space-x-5">
                                <div className="flex">
                                    <img className="policy-image" src={TickCircle}></img>
                                    <div>Instruction</div>
                                </div>
                                <div className="">Alhohol Prohibited</div>
                            </div>
                            <div className="flex space-x-1">
                                <div className="flex">
                                    <img className="policy-image" src={Payment}></img>
                                    <div>Payment</div>
                                </div>
                                <div className="flex">
                                <img className="payment-method-icon" src={Bkash}></img>
                                <img className="payment-method-icon" src={Nagad}></img>
                                <img className="payment-method-icon" src={Dbbl}></img>
                                <img className="payment-method-icon" src={Visa}></img>
                            </div>
                            </div>
                        </div>
                     

                    </div>
                </div> */}


                <div className="ratings-review-container" id="ratingReview">
                    <div className="review-rating-division">
                        <div className="font-semibold rating-title"> Ratings & Review</div>
                        <div className="flex space-x-2">
                            <img className="star-rating-icon" src={Rating}></img>
                            <div>5</div>
                            <progress value="50" max="100"></progress>
                        </div>
                        <div className="flex space-x-2">
                            <img className="star-rating-icon" src={Rating}></img>
                            <div>4</div>
                            <progress value="30" max="100"></progress>
                        </div>
                        <div className="flex space-x-2">
                            <img className="star-rating-icon" src={Rating}></img>
                            <div>3</div>
                            <progress value="10" max="100"></progress>
                        </div>
                        <div className="flex space-x-2">
                            <img className="star-rating-icon" src={Rating}></img>
                            <div>2</div>
                            <progress value="45" max="100"></progress>
                        </div>
                        <div className="flex space-x-2">
                            <img className="star-rating-icon" src={Rating}></img>
                            <div>1</div>
                            <progress value="17" max="100"></progress>
                        </div>
                    </div>

                    <div className="service-rating">

                        <div className="review-section">
                            <div className="flex space-x-1">
                                <img src={UserBackground}></img>
                                <div>
                                    <div className="rating-user-name">Mehedi Miraz</div>
                                    <div className="date">25 jan 2024</div>
                                </div>
                            </div>

                            <div className="flex space-x-1">
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={RatingStartBlank}></img>
                            </div>
                        </div>

                        <div>Good Service</div>

                        <div className="review-section">
                            <div className="flex space-x-1">
                                <img src={UserBackground}></img>
                                <div>
                                    <div className="rating-user-name">Taskin Ahmed</div>
                                    <div className="date">28 jan 2024</div>
                                </div>
                            </div>

                            <div className="flex space-x-1">
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={Rating}></img>
                                <img className="star-rating-icon" src={RatingStartBlank}></img>
                            </div>
                        </div>

                        <div class>Hotel Quality is Good</div>
                        <button className="star-rating-btn">
                            See More
                        </button>


                    </div>

                </div>



                <div className="map-section mt-[24px]">
                    <div className=" p-[24px] ">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            // mapContainerStyle={"map-view-container"}
                            zoom={10}
                            // center={center}
                            center={center}
                        // onLoad={onMapLoad}
                        // onClick={(e) => {
                        //   setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                        //   setValue("map", { lat: e.latLng.lat(), lng: e.latLng.lng() });
                        // }}
                        // onClick={onMapClick}
                        // onClick={handleMapClick}
                        >
                            {/* {rectangleBounds && (
                    <Rectangle bounds={rectangleBounds} onLoad={onRectangleLoad} />
                )} */}
                            {/* <Marker position={center} /> */}
                            <Marker />
                            {/* Additional marker at the search location */}

                            <Marker
                                clickable={true}
                                className="pointer-events-none"
                                // position={mapCenter}
                                icon={{
                                    url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Customize the marker icon as needed
                                    scaledSize: new window.google.maps.Size(30, 30),
                                }}
                            />
                        </GoogleMap>
                    </div>
                    <div className="p-[24px] space-y-[10px]">
                        <div className="font-semibold">NearBy</div>
                        <div className="flex space-x-1">
                            <img className="map-icon" src={MapPin}></img>
                            <div className="date">152 Km away from your Location</div>

                        </div>
                        <div className="flex space-x-1">
                            <img className="map-icon" src={MapPin}></img>
                            <div className="date">3 hours 54 mins needed to reach Hotel Sea View</div>

                        </div>
                    </div>
                </div>



             
                    {/* <div className="sticky bottom-[80px] z-10 flex justify-center">
                        <button className="star-rating-btn"

                            onClick={(e) => {
                                e.preventDefault(),
                                    document.getElementById("pricing-overview-modal").showModal();
                            }}>Pricing</button>
                    </div> */}
                    <div className="sticky bottom-[50px] z-10 justify-center">
                        <button
                            className="filter-btn"
                            onClick={(e) => {
                                e.preventDefault(),
                                    document.getElementById("pricing-overview-modal").showModal();
                            }}
                        >
                          
                            <a href="">Pricing</a>
                        </button>
                    </div>

                    <dialog id="pricing-overview-modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <PricingOverview></PricingOverview>
                        </div>
                    </dialog>



                    <dialog id="Room-details-modal" className="modal">
                        <div className="modal-box">
                            <form method="dialog flex">
                               <div className="font-semibold">Room Details  </div>
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>
                            <div className="room-section-horizontal-row"></div>
                            <RoomDetails  roomid = {modalId}></RoomDetails>
                        </div>
                    </dialog>
             

            </div>
        </div>
    );
};

export default HotelDetails;