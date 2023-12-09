import { useEffect, useState } from "react";
import styles from "./products.module.scss";
import {  handleQueryProduct } from "@/api/product";
import { Modal, Pagination } from "@mui/material";
import { calculateTotalPages } from "@/utils/pagination-utils";
import { columns, formColumns } from "./form";
import DataTable from "@/components/dataTable/DataTable";
import Add from "./AddProduct";
import ProductDetail from "./product-detail";

import {
  SET_TOTAL_PRODUCT,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { useDispatch, useSelector } from "react-redux";
import { convertToVietnamTime } from "@/utils/date-utils";
import { convertVNDCurrencyformatting } from "@/utils/modifield-string";

const Products = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const actionUser = useSelector((state: any) => state.user.isAddNewProduct);
  const [openDetail, setOpenDetail] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRowData, setSelectedRowData] = useState({});
  const totalProductFromStorage = localStorage.getItem("totalProduct");
  const handleFetchApi = async (pageNumber?: number) => {
    const response = await handleQueryProduct(pageNumber);
    if (response?.status == 200) {
      // console.log(response.data.data);
      
      const modifiedData = response.data.data.map(
        (item: any, index: number) => ({
          ...item,
          id: index + 1,
          product_price: `${convertVNDCurrencyformatting(item.product_price)} `,
          createdAt: convertToVietnamTime(item.createdAt),
        })
      );
      setListProduct(modifiedData);
      // dispatch(actionNextPaginationProducts(modifiedData));
      // const responseNextPage = await handleQueryProduct(currentPage + 1);
      // if (responseNextPage?.status == 200) {
      //   const modifiedNextData = responseNextPage.data.data.map((item: any, index: number) => ({
      //     ...item,
      //     id: index + 1,
      //     product_price: `$${item.product_price}`,
      //     createdAt: `${modifiedString(item)}`,
      //   }));

      //   dispatch(actionNextPaginationProducts(modifiedNextData));
      // }
    }
  };
  useEffect(() => {
    handleFetchApi(currentPage);
  }, [actionUser]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    handleFetchApi(page);
  };

  const handleClickRow = async (rowData: any) => {
    setSelectedRowData(rowData);
    setOpenDetail(true);

    // const response = await handleGetProductById(rowData._id);
    // if (response?.status === 200) {
    //   setProductData(response.data.data);
    // }
  };
  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <h1>Products</h1>
        <button
          onClick={() => {
            setOpen(true);
            dispatch(actionSetTotalUsers(SET_TOTAL_PRODUCT, false));
          }}
        >
          Add New Product
        </button>
      </div>
      <DataTable
        slug="products"
        columns={columns}
        rows={listProduct}
        isUserPage={true}
        onRowClick={(rowData) => handleClickRow(rowData.row)}
      />
      <div className={styles.pagination}>
        <Pagination
          count={calculateTotalPages(Number(totalProductFromStorage))}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>

      {open && <Add slug="Product" columns={formColumns} setOpen={setOpen} />}
      {openDetail && (
        <Modal
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ProductDetail
            selectedRowData={selectedRowData}
            setOpen={setOpenDetail}
            userData={selectedRowData}
          />
        </Modal>
      )}
    </div>
  );
};

export default Products;
