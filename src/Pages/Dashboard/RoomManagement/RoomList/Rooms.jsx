
import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";

const Rooms = () => {

  const {propertyId}=useParams();
  const [isClicked, setIsClicked] = useState("roomsList");

  const handleButtonClick = (btntype) => {
    setIsClicked(btntype);
  };

  return (
    <div className="m-[20px] rounded-[8px]">
      <ul className="country-option">
        <li>
          <Link
            to={`/dashboard/rooms/${propertyId}`}
            onClick={() => handleButtonClick("roomsList")}
            className={
              isClicked == "roomsList" ? "btn-clicked" : "btn-unclicked"
            }
          >
            Room List
          </Link>
        </li>

        <li>
          <Link
            to={`/dashboard/rooms/room-add/${propertyId}`}
            onClick={() => handleButtonClick("roomAdd")}
            className={isClicked == "roomAdd" ? "btn-clicked" : "btn-unclicked"}
          >
            Room Add
          </Link>
        </li>
      </ul>
      <Outlet></Outlet>
    </div>
  );
};

export default Rooms;
