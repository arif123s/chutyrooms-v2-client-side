import { useState, useRef, useEffect } from "react";
import "../Booking/bookinginfo.css"
import ContentEditable from "react-contenteditable";
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";




const BookingInfo = ({ name, content }) => {

    const [divcontent, setContent] = useState({ Invoice: 'Invoice No', Customer: 'Customer Name', Room: 'Room Name', Contact: 'Contact No', Hotel: 'Hotel Name' });


    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    ;
    const clearDiv = (divid) => {
        document.getElementById(divid).innerHTML = "";
    };


    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        setIsVisible(true);
    };


    const [ischecoutVisible, setIsCheckoutVisible] = useState(false);

    const togglecheckoutVisibility = () => {
        setIsCheckoutVisible(true);
    };







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

                                <th  onClick={toggleVisibility}>
                                    <div className='booking-items-title' > Check In
                                        {isVisible && (
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
                                        )}

                                    </div>

                                </th>
                                <th >
                                    <div className='booking-items-title' onClick={togglecheckoutVisibility}> Check Out
                                        {ischecoutVisible && (
                                            <DatePicker className="w-[65px]"
                                                selected={endDate}
                                                onChange={(date) => setEndDate(date)}
                                                selectsEnd
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
                                        )}

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