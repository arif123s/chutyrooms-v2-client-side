import { useState, useRef, useEffect } from "react";
import "./DashboardHome.css"
import BookingInfo from "../../Common/Includes/Booking/BookingInfo"
const DashboardHome = () => {

  //Total Booking data 
  let circleWidth = 90;
  let circleHeight = 90;
  const totalpercentage = 50;
  const pendingpercentage = 75;
  const cancelpercentage = 57;
  const completepercentage = 30;
  let radius = 35;
  const dashArray = radius * Math.PI * 2;
  const totaldashOffset = dashArray - (dashArray * totalpercentage) / 100;
  const pendingdashOffset = dashArray - (dashArray * pendingpercentage) / 100;
  const canceldashOffset = dashArray - (dashArray * cancelpercentage) / 100;
  const completedashOffset = dashArray - (dashArray * completepercentage) / 100;


  //device width portion
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    // Add event listener to update device width on window resize
    window.addEventListener('resize', handleResize);





    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  return (
    <div className="dashboard-component">
      <div className="booking-overview-container">

        <div className="booking-quantity-division">
          <div>
            <div className="booking-quantity">
              112
            </div>
            <div className="booking-type-title">Total Booking</div>
          </div>

          <div>
            <svg width={deviceWidth > 768 ? circleWidth : 75} height={deviceWidth > 576 ? circleHeight : 75} viewBox={`0 0 ${circleWidth} ${circleHeight}`} >
              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                r={radius} className="circle-background"
              />

              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                r={radius} className="circle-progress"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: totaldashOffset,
                }}

                transform={`rotate(-90 ${circleWidth / 2} ${circleHeight / 2})`}
              />
            </svg>

          </div>


        </div>
        <div className="booking-quantity-division">
          <div>
            <div className="booking-quantity">
              75
            </div>
            <div className="booking-type-title">Pending</div>
          </div>

          <div>
            <svg width={deviceWidth > 768 ? circleWidth : 75} height={deviceWidth > 576 ? circleHeight : 75} viewBox={`0 0 ${circleWidth} ${circleHeight}`} >
              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="pending-circle-background"
              />

              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="pending-circle-progress"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: pendingdashOffset,
                }}

                transform={`rotate(-90 ${circleWidth / 2} ${circleHeight / 2})`}
              />
            </svg>

          </div>


        </div>

        <div className="booking-quantity-division">
          <div>
            <div className="booking-quantity">
              31
            </div>
            <div className="booking-type-title">Canceled</div>
          </div>

          <div>
            <svg width={deviceWidth > 768 ? circleWidth : 75} height={deviceWidth > 576 ? circleHeight : 75} viewBox={`0 0 ${circleWidth} ${circleHeight}`} >
              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="cancel-circle-background"
              />

              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="cancel-background-progress"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: canceldashOffset,
                }}

                transform={`rotate(-90 ${circleWidth / 2} ${circleHeight / 2})`}
              />
            </svg>

          </div>


        </div>

        <div className="booking-quantity-division">
          <div>
            <div className="booking-quantity">
              145
            </div>
            <div className="booking-type-title">Completed</div>
          </div>

          <div>
            <svg width={deviceWidth > 768 ? circleWidth : 75} height={deviceWidth > 576 ? circleHeight : 75} viewBox={`0 0 ${circleWidth} ${circleHeight}`} >
              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="completed-circle-background"
              />

              <circle
                cx={circleWidth / 2} cy={circleHeight / 2}
                strokeWidth="15px" r={radius} className="completed-background-progress"
                style={{
                  strokeDasharray: dashArray,
                  strokeDashoffset: completedashOffset,
                }}

                transform={`rotate(-90 ${circleWidth / 2} ${circleHeight / 2})`}
              />
            </svg>

          </div>


        </div>


      </div>

      <BookingInfo />

      
    </div>

  );
};

export default DashboardHome;
