import { Link, useNavigate } from "react-router-dom";
import editIcon from "../../../../assets/icons/edit-icon.svg"
import deleteIcon from "../../../../assets/icons/delete-icon.svg"
import restoreIcon from "../../../../assets/icons/restore_icon.svg";
import { useGetAllPropertyQuery } from "../../../../redux/features/owner/propertyAdd/propertyAdd.api";
import Loading from "../../../Common/Includes/Loading/Loading";
import { BASE_ASSET_API } from "../../../../BaseApi/AssetUrl";
import { useEffect } from "react";

const PropertyList = () => {

    const navigate = useNavigate();
    const {
      data: propertyData,
      isLoading,
      refetch,
    } = useGetAllPropertyQuery();

    useEffect(()=>{
      refetch()
    },[refetch])

    console.log(propertyData?.data?.data)

    const handleDelete = async (id) => {
      console.log(id);
    };

    if(isLoading){
      return <Loading></Loading>
    }

     const handleRestore = async (id) => {
      console.log(id)
      try {
      
        navigate("/dashboard/country");
      } catch (error) {
        console.error("Error restoring item:", error);
      }
    };

    return (
      <div className="country-list-content">
        <div className="country-list min-h-[700px]">
          <table className="custom-table">
            <thead className="country-tbl-head">
              <tr>
                <th>Logo</th>
                <th>Property Name</th>
                <th>Owner</th>
                <th>Rating</th>
                <th>Active Status</th>
                <th>Others</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="gap-y-5">
              {propertyData?.data?.data?.map((property) => (
                <tr className="gap-y-[12px]" key={property.id}>
                  <td>
                    <img
                      className="w-12"
                      src={`${BASE_ASSET_API}/storage/images/property/property_logo/${property.logo}`}
                      alt=""
                    />
                  </td>
                  <td>{property.name}</td>
                  <td>
                    {property.property_owner?.map((owner) => (
                      <p key={owner.id}>{owner.name}</p>
                    ))}
                  </td>
                  <td>{property.hotel_class}</td>
                  <td>
                    <a className="active-inactive-btn">
                      {property.is_active == true ? "Active" : "Inactive"}
                    </a>
                  </td>
                  <td>
                    <a href="" onClick={(e)=>{e.preventDefault(),
                      navigate(`/dashboard/room-add/${property.id}`);}} className="active-inactive-btn">
                      Room List
                    </a>
                  </td>
                  <td className="country-action-div">
                    <Link
                      to={`/dashboard/property/${property.id}/edit`}
                      className="edit-btn mt-[2px]"
                    >
                      <img
                        className="edit-delete-icon"
                        src={editIcon}
                        alt="image"
                      ></img>
                    </Link>

                    {property.deleted_at == null ? (
                      <a
                        className="delete-btn mt-[2px]"
                        onClick={() => handleDelete(property.id)}
                      >
                        <img
                          className="edit-delete-icon mt-[2px]"
                          src={deleteIcon}
                          alt="image"
                        ></img>
                      </a>
                    ) : (
                      <a
                        className="restore-btn"
                        onClick={() => handleRestore(property.id)}
                      >
                        <img
                          className="edit-delete-icon"
                          src={restoreIcon}
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

export default PropertyList;