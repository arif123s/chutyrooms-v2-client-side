// import EditIcon from "../../../../../../assets/icons/edit-icon.svg";
import EditIcon from "../../../../../assets/icons/edit-icon.svg";
// import DeleteIcon from "../../../../../../assets/icons/delete-icon.svg";
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
// import RestoreIcon from "../../../../../../assets/icons/restore_icon_green.svg";
import RestoreIcon from "../../../../../assets/icons/restore_icon_green.svg";
import { useEffect } from "react";
import Loading from "../../../../Common/Includes/Loading/Loading"

import { Link } from "react-router-dom";
import { useGetAllPropertyTypesQuery , useDeletePropertyTypeMutation , useRestorePropertyTypeMutation } from "../../../../../redux/features/admin/Property/PropertyTypes.api";

const PropertyTypeList = () => {

    const [deletePropertyType,
        { isLoading: deleteLoading,
         //  isError 
         }] =  useDeletePropertyTypeMutation();
     const [restorePropertyType, 
       { isLoading: restoreLoading }] =
       useRestorePropertyTypeMutation();
    
      const { data, isLoading, refetch } = useGetAllPropertyTypesQuery();
      console.log(data);
    
     
      const PropertyTypes = data?.data.data;
    
    
      useEffect(() => {
        refetch();
      }, []);
    
      if (isLoading) {
        return <Loading></Loading>;
      }
    
      const handleDelete = async (id) => {
        try {
          // Call the deletePaymentMethod mutation
          const result = await deletePropertyType(id);
          console.log("Property Type deleted:", result);
          if (result?.data?.status == 1) {
            refetch();
          }
        } catch (error) {
          console.error("Error deleting Room Type:", error);
        }
      };
    
      const handleRestore = async (id) => {
        try {
          const result = await restorePropertyType(id);
          console.log("Property Type restored:", result);
          if (result?.data?.status == 1) {
            refetch();
          }
        } catch (error) {
          console.error("Error restore Room Type:", error);
        }
      };
    return (
      
         <div className="PropertyType-list">
             <table className="custom-table">
        <thead className="PropertyType-tbl-head">
          <tr>
            <th>PropertyType Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="gap-y-5">
          {PropertyTypes?.slice()
            .sort((a, b) => a.view_order - b.view_order)
            .map((PropertyTypes) => (
              <tr key={PropertyTypes.id}>
                <td>{PropertyTypes.name}</td>
               
                <td>{PropertyTypes.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {PropertyTypes.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`dashboard/properties/propertyTypes/editPropertyType/${PropertyTypes.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {PropertyTypes.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(PropertyTypes.id)}
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
                      onClick={() => handleRestore(PropertyTypes.id)}
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

export default PropertyTypeList;