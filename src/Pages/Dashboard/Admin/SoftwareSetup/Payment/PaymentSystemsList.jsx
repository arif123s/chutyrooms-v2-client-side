import EditIcon from "../../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../../assets/icons/restore_icon_green.svg";
import { useEffect , useState } from "react";
import Loading from "../../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import {
  useDeletePaymentMethodMutation,
  useGetAllPaymentMethodsQuery,
  useRestorePaymentMethodMutation,
} from "../../../../../redux/features/admin/paymentMethod/paymentMethod.api";

import ArrowRightPaginate from '../../../../../assets/icons/arrow-left-paginate.svg';
import ArrowLeftPaginate from '../../../../../assets/icons/arrow-right-paginate.svg';
import ArrowRightHidden from '../../../../../assets/icons/arrow-left-hide.svg';
import ArrowLeftHidden from '../../../../../assets/icons/arrow-right-hide.svg';

const PaymentSystemsList = () => {

  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
   
  
    const defaultLeftArrow = ArrowLeftPaginate;
    const conditionalLeftArrow = ArrowLeftHidden;
    const defaultRightArrow = ArrowRightPaginate;
    const conditionalRightArrow = ArrowRightHidden;
  
  
    let RightArrowUrl = defaultRightArrow;
    let LeftArrowUrl = defaultLeftArrow;
  const [deletePaymentMethod,
     { isLoading: deleteLoading,
      //  isError 
      }] =  useDeletePaymentMethodMutation();
  const [restorePaymentMethod, 
    { isLoading: restoreLoading }] =
    useRestorePaymentMethodMutation();
    const { data, isLoading, refetch } = useGetAllPaymentMethodsQuery(currentPage);



    const PaymentMethods = data?.data?.data;


    useEffect(() => {
      if (data?.data?.pagination) {
        setTotalPages(data.data.pagination.last_page);
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

  if (isLoading || deleteLoading || restoreLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = async (id) => {
    try {
      // Call the deletePaymentMethod mutation
      const result = await deletePaymentMethod(id);
      console.log("Payment method deleted:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
    }
  };

  const handleRestore = async (id) => {
    try {
      const result = await restorePaymentMethod(id);
      console.log("Payment method restored:", result);
      if (result?.data?.status == 1) {
        refetch();
      }
    } catch (error) {
      console.error("Error restore payment method:", error);
    }
  };

  return (
    <div className="payment-list">
      <table className="custom-table">
        <thead className="membership-tbl-head">
          <tr>
            <th>PaymentType Name</th>
            <th>View Order</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className="gap-y-5">
          {PaymentMethods.slice()
            .sort((a, b) => a.view_order - b.view_order)
            .map((PaymentMethod) => (
              <tr key={PaymentMethod.id}>
                <td>{PaymentMethod.name}</td>
                <td>{PaymentMethod.view_order}</td>
                <td>
                  <a className="active-inactive-btn">
                    {PaymentMethod.is_active == true ? "Active" : "Inactive"}
                  </a>
                </td>
                <td className="country-action-div">
                  <Link
                    className="edit-btn"
                    to={`/dashboard/PaymentSystems/PaymentEdit/${PaymentMethod.id}`}
                  >
                    <img
                      className="edit-delete-icon"
                      src={EditIcon}
                      alt="image"
                    ></img>
                  </Link>

                  {PaymentMethod.deleted_at == null ? (
                    <a
                      className="delete-btn"
                      onClick={() => handleDelete(PaymentMethod.id)}
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
                      onClick={() => handleRestore(PaymentMethod.id)}
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

      <div className='pagination w-full absolute'>
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

export default PaymentSystemsList;
