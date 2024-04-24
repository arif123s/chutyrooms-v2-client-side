import EditIcon from "../../../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../../../assets/icons/restore_icon_green.svg";
import { useEffect } from "react";
// import Loading from "../../../../Common/Includes/Loading/Loading";
import Loading from "../../../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetAllRoomTypesQuery , useDeleteRoomTypeMutation , useRestoreRoomTypeMutation } from "../../../../../../redux/features/admin/Room/RoomTypes.api";

const RoomTypeList = () => {
    const [deleteRoomType,
        { isLoading: deleteLoading,
         //  isError 
         }] =  useDeleteRoomTypeMutation();
     const [restoreRoomType, 
       { isLoading: restoreLoading }] =
       useRestoreRoomTypeMutation();
    
      const { data, isLoading, refetch } = useGetAllRoomTypesQuery();
      console.log(data);
    
     
      const RoomTypes = data?.data.data;
      // console.log(RoomTypes);
    
      useEffect(() => {
        refetch();
      }, []);
    
      if (isLoading) {
        return <Loading></Loading>;
      }
    
      const handleDelete = async (id) => {
        try {
          // Call the deletePaymentMethod mutation
          const result = await deleteRoomType(id);
          console.log("Room Type deleted:", result);
          if (result?.data?.status == 1) {
            refetch();
          }
        } catch (error) {
          console.error("Error deleting Room Type:", error);
        }
      };
    
      const handleRestore = async (id) => {
        try {
          const result = await restoreRoomType(id);
          console.log("Room Type restored:", result);
          if (result?.data?.status == 1) {
            refetch();
          }
        } catch (error) {
          console.error("Error restore Room Type:", error);
        }
      };
      
    return (
        <div className="RoomType-list">
             <table className="custom-table">
        <thead className="RoomType-tbl-head">
          <tr>
            <th>RoomType Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="gap-y-5">
          {RoomTypes?.slice()
            .sort((a, b) => a.view_order - b.view_order)
            .map((RoomTypes) => (
              <tr key={RoomTypes.id}>
                <td>{RoomTypes.name}</td>
               
                <td>{RoomTypes.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {RoomTypes.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`dashboard/rooms/roomTypes/editRoomType/${RoomTypes.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {RoomTypes.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(RoomTypes.id)}
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
                      onClick={() => handleRestore(RoomTypes.id)}
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
    );
};

export default RoomTypeList;