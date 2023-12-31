import "../DashboardHome/DashboardHome.css"
const DashboardHome = () => {  

  //Total Booking data 
  const circleWidth = 95;
  const circleHeight = 95;
  const percentage = 50;
  const radius = 35;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percentage) / 100;



  return (
    <div className="booking-overview-container">
     <div className="grid grid-cols-4 gap-4 m-5">
        <div className="bg-white flex justify-between items-center  p-[24px] rounded-[8px]">
          <div className="">
            <div className="booking-quantity">
              112
            </div>
            <div className="booking-type-title">Total Booking</div>
          </div>

          <div>
            <svg width={circleWidth} height={circleHeight} viewBox={`0 0 ${circleWidth} ${circleHeight}`} >
              <circle 
              cx={circleWidth / 2} cy={circleHeight / 2}
              strokeWidth="15px" r={radius} className="circle-background"
              />

            <circle 
              cx={circleWidth / 2} cy={circleHeight / 2}
              strokeWidth="15px" r={radius} className="circle-progress"
              style={{
                strokeDasharray : dashArray,
                strokeDashoffset : dashOffset,
              }}

              transform={`rotate(-90 ${circleWidth/2} ${circleHeight/2})`}
              />
            </svg>

          </div>


        </div>
        <div className="bg-white"></div>
        <div className="bg-white"></div>
        <div className="bg-white"></div>
     </div>
    </div>
  );
};

export default DashboardHome;
