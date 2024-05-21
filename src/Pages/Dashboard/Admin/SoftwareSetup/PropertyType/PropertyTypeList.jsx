// import EditIcon from "../../../../../../assets/icons/edit-icon.svg";
import EditIcon from "../../../../../assets/icons/edit-icon.svg";
// import DeleteIcon from "../../../../../../assets/icons/delete-icon.svg";
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
// import RestoreIcon from "../../../../../../assets/icons/restore_icon_green.svg";
import RestoreIcon from "../../../../../assets/icons/restore_icon_green.svg";
import { useEffect , useState } from "react";
import Loading from "../../../../Common/Includes/Loading/Loading"

import { Link } from "react-router-dom";
import { useGetAllPropertyTypesQuery , useDeletePropertyTypeMutation , useRestorePropertyTypeMutation } from "../../../../../redux/features/admin/Property/PropertyTypes.api";

import ArrowRightPaginate from '../../../../../assets/icons/arrow-left-paginate.svg';
import ArrowLeftPaginate from '../../../../../assets/icons/arrow-right-paginate.svg';
import ArrowRightHidden from '../../../../../assets/icons/arrow-left-hide.svg';
import ArrowLeftHidden from '../../../../../assets/icons/arrow-right-hide.svg';

const PropertyTypeList = () => {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
 

  const defaultLeftArrow = ArrowLeftPaginate;
  const conditionalLeftArrow = ArrowLeftHidden;
  const defaultRightArrow = ArrowRightPaginate;
  const conditionalRightArrow = ArrowRightHidden;


  let RightArrowUrl = defaultRightArrow;
  let LeftArrowUrl = defaultLeftArrow;

    const [deletePropertyType,
        { isLoading: deleteLoading,
         //  isError 
         }] =  useDeletePropertyTypeMutation();
     const [restorePropertyType, 
       { isLoading: restoreLoading }] =
       useRestorePropertyTypeMutation();
    
      const { data, isLoading, refetch } = useGetAllPropertyTypesQuery(currentPage);
      console.log(data);
    
     
      const PropertyTypes = data?.data?.data;
    
    
      useEffect(() => {
        if (data?.data?.pagination) {
          setTotalPages(data?.data?.pagination.last_page);
        }
        refetch();
      }, [currentPage, refetch, data]);
  
  
    if (currentPage === 1) {
      RightArrowUrl = conditionalRightArrow;
      
    }
    
    else
    {
      RightArrowUrl = defaultRightArrow;
    }
    
    if (currentPage === totalPages) {
      LeftArrowUrl = conditionalLeftArrow;
     
    }
    
    else{
      LeftArrowUrl = defaultLeftArrow;
    }
    
    
    
    const handlePageChange = (pageNumber) => {
     
      if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      }
    };
    
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

      <div className='pagination w-full'>
        <img  src={RightArrowUrl} onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}></img>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber}  className={`${
            currentPage === pageNumber 
              ? "onclick-page-color"
              : "onclickcancel-page-color"
          } } `} onClick={() => {
            handlePageChange(pageNumber);
          
          }}
          
            disabled={currentPage === pageNumber}>
            {pageNumber}
          </button>
        ))}
        <img src={LeftArrowUrl} onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}></img>
      </div>
        </div>
     
    );
};

export default PropertyTypeList;