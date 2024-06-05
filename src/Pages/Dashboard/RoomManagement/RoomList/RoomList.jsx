import EditIcon from "../../../../assets/icons/edit-icon.svg";
import DeleteIcon from "../../../../assets/icons/delete-icon.svg";
import RestoreIcon from "../../../../assets/icons/restore_icon_green.svg";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Common/Includes/Loading/Loading";
import { Link } from "react-router-dom";
import { useGetAllRoomsQuery } from "../../../../redux/features/owner/RoomAdd/roomAdd.api";
import ArrowRightPaginate from "../../../../assets/icons/arrow-left-paginate.svg";
import ArrowLeftPaginate from "../../../../assets/icons/arrow-right-paginate.svg";
import ArrowRightHidden from "../../../../assets/icons/arrow-left-hide.svg";
import ArrowLeftHidden from "../../../../assets/icons/arrow-right-hide.svg";

const RoomList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const defaultLeftArrow = ArrowLeftPaginate;
  const conditionalLeftArrow = ArrowLeftHidden;
  const defaultRightArrow = ArrowRightPaginate;
  const conditionalRightArrow = ArrowRightHidden;

  let RightArrowUrl = defaultRightArrow;
  let LeftArrowUrl = defaultLeftArrow;
  const { propertyId } = useParams();
  const { data, isLoading, refetch } = useGetAllRoomsQuery(
    propertyId,
    currentPage
  );

  const RoomLists = data?.data?.data;

  useEffect(() => {
    if (data?.data?.pagination) {
      setTotalPages(data?.data?.pagination.last_page);
    }
  }, [currentPage, data]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (currentPage === 1) {
    RightArrowUrl = conditionalRightArrow;
  } else {
    RightArrowUrl = defaultRightArrow;
  }

  if (currentPage === totalPages) {
    LeftArrowUrl = conditionalLeftArrow;
  } else {
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

  return (
    <div className="">
      {RoomLists?.length>=1 && (
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
                  <tr key={RoomList?.id}>
                    <td>
                      <img className="w-[60px]" src={RoomList?.image} alt="" />
                    </td>
                    <td>{RoomList?.name}</td>
                    <td>{RoomList?.room_quantity}</td>
                    <td>{RoomList?.user_price}</td>

                    <td>{RoomList?.view_order}</td>
                    <td>
                      <a className="active-inactive-btn">
                        {RoomList?.is_active == true ? "Active" : "Inactive"}
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
                          // onClick={() => handleDelete(RoomList.id)}
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
                          // onClick={() => handleRestore(RoomList.id)}
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

          <div className="pagination w-full">
            <img
              src={RightArrowUrl}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            ></img>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={`${
                    currentPage === pageNumber
                      ? "onclick-page-color"
                      : "onclickcancel-page-color"
                  } } `}
                  onClick={() => {
                    handlePageChange(pageNumber);
                  }}
                  disabled={currentPage === pageNumber}
                >
                  {pageNumber}
                </button>
              )
            )}
            <img
              src={LeftArrowUrl}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            ></img>
          </div>
        </div>
      )}
      {RoomLists?.length < 1 && (
        <h2 className="font-['Gilroy-semibold'] ml-[20px]">
          No room available!
        </h2>
      )}
    </div>
  );
};

export default RoomList;
