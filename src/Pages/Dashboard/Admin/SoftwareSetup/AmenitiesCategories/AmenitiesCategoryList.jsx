import EditIcon from "../../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../../assets/icons/restore_icon_green.svg";
import { useEffect } from "react";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetAllAmenitiesCategoriesQuery , useDeleteAmenitiesCategoryMutation , useRestoreAmenitiesCategoryMutation} from "../../../../../redux/features/admin/Amenities/amenitiesCategory.api";
import "./AmenitiesCategories.css"
const AmenitiesCategoryList = () => {

  const [deleteAmenitiesCategory,
    { isLoading: deleteLoading,
     //  isError 
     }] =  useDeleteAmenitiesCategoryMutation();
 const [restoreAmenitiesCategory, 
   { isLoading: restoreLoading }] =
   useRestoreAmenitiesCategoryMutation();

  const { data, isLoading, refetch } = useGetAllAmenitiesCategoriesQuery();
  // console.log(data);

 
  const AmenitiesCategories = data?.data.data;
  // console.log(AmenitiesCategories);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = async (id) => {
    try {
      // Call the deletePaymentMethod mutation
      const result = await deleteAmenitiesCategory(id);
      console.log("Amenities Catergory deleted:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting Amenities Catergory:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const result = await restoreAmenitiesCategory(id);
      console.log("Amenities Catergory restored:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error restore Amenities Catergory:", error);
    }
  };
  



    return (
        <div className="amenities-list">
      <table className="custom-table">
        <thead className="amaenities-tbl-head">
          <tr>
            <th>Amenities Category Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="gap-y-5">
          {AmenitiesCategories?.slice()
            .sort((a, b) => a.view_order - b.view_order)
            .map((AmenitiesCategories) => (
              <tr key={AmenitiesCategories.id}>
                <td>{AmenitiesCategories.name}</td>
                <td>{AmenitiesCategories.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {AmenitiesCategories.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`/dashboard/AmenitiesCategories/AmenitiesCategoryEdit/${AmenitiesCategories.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {AmenitiesCategories.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(AmenitiesCategories.id)}
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
                      onClick={() => handleRestore(AmenitiesCategories.id)}
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