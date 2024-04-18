import EditIcon from "../../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../../assets/icons/restore_icon_green.svg";
import { useEffect } from "react";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetAllAmenitiesQuery  , useDeleteAmenitiesMutation , useRestoreAmenitiesMutation} from "../../../../../redux/features/admin/Amenities/amenities.api";
import "../AmenitiesCategories/AmenitiesCategories.css";
const AmenitiesCategoryList = () => {

  const [deleteAmenities,
    { isLoading: deleteLoading,
     //  isError 
     }] =  useDeleteAmenitiesMutation();
 const [restoreAmenities, 
   { isLoading: restoreLoading }] =
   useRestoreAmenitiesMutation();

  const { data, isLoading, refetch } = useGetAllAmenitiesQuery();
  console.log(data);

 
  const Amenities = data?.data.data;
  // console.log(Amenities);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = async (id) => {
    try {
      // Call the deletePaymentMethod mutation
      const result = await deleteAmenities(id);
      console.log("Amenities deleted:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting Amenities:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const result = await restoreAmenities(id);
      console.log("Amenities restored:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error restore Amenities:", error);
    }
  };
  



    return (
        <div className="amenities-list">
      <table className="custom-table">
        <thead className="amaenities-tbl-head">
          <tr>
            <th>Amenities Name</th>
            <th>Amenities Category</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="gap-y-5">
          {Amenities.slice()
            .sort((a, b) => a.view_order - b.view_order)
            .map((Amenities) => (
              <tr key={Amenities.id}>
                <td>{Amenities.name}</td>
                <td>{Amenities.amenities_type.name}</td>
                <td>{Amenities.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {Amenities.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`/dashboard/Amenities/AmenitiesCategoryEdit/${Amenities.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {Amenities.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(Amenities.id)}
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
                      onClick={() => handleRestore(Amenities.id)}
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

export default AmenitiesCategoryList;