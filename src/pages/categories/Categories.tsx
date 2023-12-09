import { useEffect, useState } from "react";
import styles from "./category.module.scss";
import DataTable from "@/components/dataTable/DataTable";
import {  Pagination } from "@mui/material";
import { categoryColumns } from "./model-category";
import AddCategory from "./components/add";
import {  handleQueryCategory } from "@/api/category";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_TOTAL_CATEGORY,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { ToastContainer } from "react-toastify";
import { convertToVietnamTime } from "@/utils/date-utils";

export default function Categories() {
  const [open, setOpen] = useState(false);
  // const [modalDelete, setModalDelete] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [pageNumber, setPageNumber] = useState<number>();
  const [rowDataCategory, setRowDataCategory] = useState<CategoryModel>();
  const [currentPage, setCurrentPage] = useState(1);
  const actionUser = useSelector((state: any) => state.user.isAddNewCategory);
  const dispatch = useDispatch();

  const handleFetchApi = async (pageNumber?: number) => {
    const response = await handleQueryCategory(pageNumber);
    if (response?.status == 200) {
      const modifiedData = response.data.data.map(
        (item: any, index: number) => ({
          ...item,
          id: index + 1,
          createdAt: convertToVietnamTime(item.createdAt),
          updatedAt: convertToVietnamTime(item.updatedAt),
        })
      );

      setPageNumber(response.data.options.maxPage);
      setListProduct(modifiedData);
    }
  };
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    handleFetchApi(page);
  };
  // const handleDelete = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await handleDeleteCategory(rowDataCategory!._id);
  //     if (response?.status == 200) {
  //       toast.success("Delete success!");
  //       dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, true));
  //     }
  //   } catch (error) {
  //     logError(error, "handleDelete");
  //   } finally {
  //     setIsLoading(false);
  //     setModalDelete(false);
  //   }
  // };
  useEffect(() => {
    handleFetchApi(currentPage);
  }, [actionUser]);

  return (
    <div className={styles.category}>
      <div className={styles.info}>
        <h1>Category</h1>
        <button
          onClick={() => {
            setOpen(true);
            dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, false));
          }}
        >
          Add New Category
        </button>
      </div>
      <ToastContainer />
      <DataTable
        slug="products"
        columns={categoryColumns}
        rows={listProduct}
        isUserPage={false}
        onActionUpdateClick={() => {
          dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, false));
          setIsUpdated(true);
          setOpen(true);
        }}
        // onActionDeleteClick={() => {
        //   setModalDelete(true);
        //   dispatch(actionSetTotalUsers(SET_TOTAL_CATEGORY, false));
        // }}
        onRowClick={(rowData) => {
          setRowDataCategory(rowData.row);
        }}
      />
      <div className={styles.pagination}>
        <Pagination
          count={pageNumber}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>
      {/* {modalDelete && (
        <Modal
          open={modalDelete}
          onClose={() => setModalDelete(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="add">
            <div className="modal" style={{ background: "white" }}>
              <h3>
                Are you sure you want to delete {rowDataCategory?.category_name}
                ?
              </h3>
              {isLoading ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                >
                  <CircularProgress size={30} />
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 20,
                    marginBottom: 10,
                  }}
                >
                  <button
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      background: "red",
                    }}
                    onClick={handleDelete}
                  >
                    Yes
                  </button>
                  <button
                    style={{
                      paddingLeft: 20,
                      paddingRight: 20,
                      background: "#1AB65C",
                    }}
                    onClick={() => setModalDelete(false)}
                  >
                    No
                  </button>
                </div>
              )}
            </div>
          </div>
        </Modal>
      )} */}
      {/* modal add */}
      {open && (
        <AddCategory
          selectedRowData={rowDataCategory}
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          slug="Category"
          setOpen={setOpen}
        />
      )}
    </div>
  );
}
