import { useState, useRef, useEffect } from "react";
import "../Booking/bookinginfo.css"
import ContentEditable from "react-contenteditable";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import ArrowRight from "../../../../assets/icons/arrow-right.svg"
import ArrowLeft from "../../../../assets/icons/arrow-left.svg"
// import "../Booking/bookinginfoDatePickerModify.css"




const BookingInfo = ({ name, content }) => {

    const [divcontent, setContent] = useState({ Invoice: 'Invoice No', Customer: 'Customer Name', Room: 'Room Name', Contact: 'Contact No', Hotel: 'Hotel Name', Checkin: 'Check In', Checkout: 'Check Out' });


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const clearDiv = (divid) => {
        document.getElementById(divid).innerHTML = "";
    };



    // const [isVisible, setIsVisible] = useState(false);

    // const toggleVisibility = () => {
    //     setIsVisible(!isVisible);
    //     setIsVisible(true);
    // };


    // const [ischecoutVisible, setIsCheckoutVisible] = useState(false);

    // const togglecheckoutVisibility = () => {
    //     setIsCheckoutVisible(true);
    //     setCalendarVisible(false);
    // };

    const [selectedDate, setSelectedDate] = useState(null);

    const [calendarVisible, setCalendarVisible] = useState(true);
    const divToBeClickedRef = useRef(null);

    const handleDivClick = () => {


        // setCalendarVisible(true);
        // setCalendarVisible(true);
        setCalendarVisible(!calendarVisible);
        if (divToBeClickedRef.current) {
            divToBeClickedRef.current.setOpen(true);
        }

    };


    const handleDateChange = (date) => {
        setSelectedDate(date);
        setCalendarVisible(false);

    };



    const [selectedCheckoutDate, setSelectedCheckoutDate] = useState(null);
    const [CheckoutcalendarVisible, setCheckoutCalendarVisible] = useState(false);
    const divToBecheckoutClickedRef = useRef(null);

    const handlecheckoutDivClick = () => {



        // setCalendarVisible(true);
        // setCalendarVisible(true);
        setCheckoutCalendarVisible(!CheckoutcalendarVisible);
        if (divToBecheckoutClickedRef.current) {
            divToBecheckoutClickedRef.current.setOpen(true);
        }

    };


    const handlecheckoutDateChange = (date) => {
        setSelectedCheckoutDate(date);
        // setCheckoutCalendarVisible(false);


    };


    //   const [ischecoutVisible, setIsCheckoutVisible] = useState(false);

    // const togglecheckoutVisibility = () => {
    //     setIsCheckoutVisible(true);
    //     setCalendarVisible(false);
    // };



    const getYear = (val) => {
        return val.getFullYear();
    }

    const getMonth = (val) => {
        return val.getMonth();
    }
    // const [yearsArr, setYearsArr] = useState([]);
    const yearsArr = [];
    const range = (pre, val) => {
        for (let i = pre; i <= val; i++) {
            // const newArray = yearsArr.concat(i);

            // // Updating the state with the new array
            // setYearsArr(newArray);
            yearsArr.push(i);
        }
        return yearsArr;
    }


    const years = range(1990, getYear(new Date()));
    // const years = [1990, 1991, 19];
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];




    return (
        <div className='booking-list-container'>
            <div className='booking-list'>
                <div className='table-division'>
                    <table className="table ">
                        <thead>
                            <tr>
                                <th>
                                    <div className='booking-items-title' contentEditable id={divcontent.Invoice} onClick={(e) => clearDiv(divcontent.Invoice)} >{divcontent.Invoice} </div>
                                </th>
                                <th>
                                    <div className='booking-items-title' contentEditable id={divcontent.Customer} onClick={(e) => clearDiv(divcontent.Customer)}>{divcontent.Customer}</div>

                                </th>
                                <th >
                                    <div className='booking-items-title' contentEditable id={divcontent.Room} onClick={(e) => clearDiv(divcontent.Room)} >{divcontent.Room} </div>

                                </th>
                                <th >
                                    <div className='booking-items-title' contentEditable id={divcontent.Contact} onClick={(e) => clearDiv(divcontent.Contact)} >{divcontent.Contact} </div>

                                </th>

                                <th  >
                                    <div onClick={handleDivClick} className='booking-items-title' >
                                        <div className="relative">
                                            <span onClick={(e) => clearDiv(divcontent.Checkin)} id={divcontent.Checkin}>
                                                {divcontent.Checkin}
                                            </span>
                                            {/* {calendarVisible && ( */}
                                            <DatePicker className="w-[65px]"
                                                selected={selectedDate}
                                                onChange={(date) => {
                                                    setSelectedDate(date);
                                                    setCalendarVisible(false);
                                                }}
                                                ref={divToBeClickedRef}

                                                startDate={selectedDate}
                                                endDate={endDate}
                                                minDate={selectedDate}
                                                // showMonthDropdown

                                                // showMonthYearPicker
                                                // closeOnScroll={true}
                                                // shouldCloseOnSelect
                                                // dateFormatCalendar="m"
                                                // showYearDropdown
                                                // showPopperArrow={false}
                                                withPortal
                                                // clo


                                                // inline

                                                renderCustomHeader={({
                                                    date,
                                                    changeYear,
                                                    changeMonth,
                                                    decreaseMonth,
                                                    increaseMonth,
                                                    prevMonthButtonDisabled,
                                                    nextMonthButtonDisabled,
                                                }) => (
                                                    <div  className="custom-header-div">
                                                        <button className="left-arrow" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                           <img src={ArrowLeft} className="calender-icon"/>
                                                        </button>
                                                        
                                                        <div className="month-year-division">

                                                        <select className="month-dropdown"
                                                            value={months[getMonth(date)]}
                                                            // value={months[0]}
                                                            onChange={({ target: { value } }) =>
                                                                changeMonth(months.indexOf(value))
                                                            }
                                                        >
                                                            {months.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <select className="year-dropdown"
                                                            value={getYear(date)}
                                                            // value={
                                                            //     1991
                                                            // }
                                                            onChange={({ target: { value } }) => changeYear(value)}
                                                        >
                                                            {years.map((option) => (
                                                                <option key={option} value={option}>
                                                                    {option}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        </div>

                                                        <button className='right-arrow' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                        <img src={ArrowRight} className="calender-icon"/>
                                                        </button>
                                                    </div>
                                                )}



                                            />
                                            {/* )}  */}

                                            <div>
                                                {/* {isVisible && (
                                            <DatePicker className="w-[65px]"
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                                selectsStart
                                                startDate={startDate}
                                                endDate={endDate}
                                                minDate={startDate}
                                                showMonthDropdown
                                                showYearDropdown
                                                // yearDropdownItemNumber={10}
                                                // scrollableYearDropdown
                                                // showMonthYearPicker
                                                withPortal
                                            />
                                        )} */}





                                            </div>
                                        </div>


                                    </div>

                                </th>
                                <th >
                                    <div onClick={handlecheckoutDivClick} className='booking-items-title' >
                                        <div className="relative">
                                            <span onClick={(e) => clearDiv(divcontent.Checkout)} id={divcontent.Checkout}>
                                                {divcontent.Checkout}
                                            </span>
                                            <div>

                                                <DatePicker className="w-[65px]"
                                                    selected={selectedCheckoutDate}
                                                    onChange={handlecheckoutDateChange}
                                                    selectsEnd
                                                    startDate={selectedDate}
                                                    endDate={endDate}
                                                    minDate={selectedDate}
                                                    ref={divToBecheckoutClickedRef}
                                                    showMonthDropdown
                                                    showYearDropdown
                                                    // yearDropdownItemNumber={10}
                                                    // scrollableYearDropdown
                                                    // showMonthYearPicker
                                                    withPortal




                                                    renderCustomHeader={({
                                                        date,
                                                        changeYear,
                                                        changeMonth,
                                                        decreaseMonth,
                                                        increaseMonth,
                                                        prevMonthButtonDisabled,
                                                        nextMonthButtonDisabled,
                                                    }) => (
                                                        <div  className="custom-header-div">
                                                            <button className="left-arrow" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                            <img src={ArrowLeft} className="calender-icon"/>
                                                            </button>
                                                            
                                                            <div className="month-year-division">
    
                                                            <select className="month-dropdown"
                                                                value={months[getMonth(date)]}
                                                                // value={months[0]}
                                                                onChange={({ target: { value } }) =>
                                                                    changeMonth(months.indexOf(value))
                                                                }
                                                            >
                                                                {months.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>
    
                                                            <select className="year-dropdown"
                                                                value={getYear(date)}
                                                                // value={
                                                                //     1991
                                                                // }
                                                                onChange={({ target: { value } }) => changeYear(value)}
                                                            >
                                                                {years.map((option) => (
                                                                    <option key={option} value={option}>
                                                                        {option}
                                                                    </option>
                                                                ))}
                                                            </select>

                                                            </div>
    
                                                            <button className='right-arrow' onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                            <img src={ArrowRight} className="calender-icon"/>
                                                            </button>
                                                        </div>
                                                    )}
    


                                                />

                                            </div>
                                        </div>

                                    </div>

                                </th>
                                <th >
                                    <div className='booking-items-title' contentEditable id={divcontent.Hotel} onClick={(e) => clearDiv(divcontent.Hotel)} >{divcontent.Hotel}</div>

                                </th>
                                <th >
                                    <div className='booking-items-title'> Guest </div>

                                </th>
                                <th >
                                    <div className='booking-items-title'> Booking Date </div>

                                </th>
                                <th >
                                    <div className='booking-items-title'> Price </div>

                                </th>
                                <th >
                                    <div className='booking-items-title'> Status </div>

                                </th>

                            </tr>

                        </thead>
                        <tbody>
                            <tr>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>

                            </tr>

                            <tr>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>

                            </tr>
                            <tr>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>
                                <td>ABc</td>
                                <td>01224444</td>

                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


    );
};

export default BookingInfo;