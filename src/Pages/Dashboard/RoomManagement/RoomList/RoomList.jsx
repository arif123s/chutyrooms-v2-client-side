import EditIcon from "../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../assets/icons/restore_icon_green.svg";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../../../redux/features/owner/RoomAdd/roomAdd.api";

const RoomList = () => {
  const { propertyId } = useParams();
  const { data, isLoading, refetch } = useGetAllRoomsQuery(propertyId);

  const RoomLists = data?.data?.data;
  console.log(RoomLists);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="">
      <div className="RoomType-list">
        <table className="custom-table">
          <thead className="RoomType-tbl-head">
            <tr>
              <th>Room Image</th>
              <th>Room Name</th>
              <th>Room Quantity</th>
              <th>Price</th>
              <th>View Order</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody className="gap-y-5">
            {RoomLists?.slice()
              .sort((a, b) => a.view_order - b.view_order)
              .map((RoomList) => (
                <tr key={RoomList.id}>
                  <td>
                    <img className="w-[60px]" src={RoomList?.image} alt="" />
                  </td>
                  <td>{RoomList.name}</td>
                  <td>{RoomList.room_quantity}</td>
                  <td>{RoomList.user_price}</td>

                  <td>{RoomList.view_order}</td>
                  <td>
                    <a className="active-inactive-btn">
                      {RoomList.is_active == true ? "Active" : "Inactive"}
                    </a>
                  </td>
                  <td className="country-action-div mt-[16px]">
                    <Link
                      className="edit-btn"
                      to={`/dashboard/room-edit/${RoomList?.id}`}
                    >
                      <img
                        className="edit-delete-icon"
                        src={EditIcon}
                        alt="image"
                      ></img>
                    </Link>

                    {RoomList.deleted_at == null ? (
                      <a
                        className="delete-btn"
                        onClick={() => handleDelete(RoomList.id)}
                      >
                        <img
                          className="edit-delete-icon"
                          src={DeleteIcon}
                          alt="image"
                        ></img>
                      </a>
                    ) : (
                      <a
                        className="restore-btn"
                        onClick={() => handleRestore(RoomList.id)}
                      >
                        <img
                          className="edit-delete-icon"
                          src={RestoreIcon}
                          alt="image"
                        ></img>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
