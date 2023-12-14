import { useEffect, useState } from "react";
import styles from "../../products.module.scss";
import {  handleQueryPublishedProducts } from "@/api/product";
import { CircularProgress, Modal } from "@mui/material";
import { useSelector } from "react-redux";
import { convertToVietnamTime } from "@/utils/date-utils";
import { convertVNDCurrencyformatting } from "@/utils/modifield-string";
import DataTable from "@/components/dataTable/DataTable";
import { columns } from "../../form";
import ProductDetail from "../../components/product-detail";

const PublishedProducts = () => {
  const actionUser = useSelector((state: any) => state.user.isAddNewProduct);
  const [openDetail, setOpenDetail] = useState(false);
  const [listProduct, setListProduct] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [loading, setLoading] = useState(false)

  const handleFetchApi = async () => {
   try {
    setLoading(true)
    const response = await handleQueryPublishedProducts();
    if (response?.status == 200) {
    //   console.log(response.data.data);

      const modifiedData = response.data.data.map(
        (item: any, index: number) => ({
          ...item,
          id: index + 1,
          product_price: `${convertVNDCurrencyformatting(item.product_price)} `,
          createdAt: convertToVietnamTime(item.createdAt),
        })
      );
      setListProduct(modifiedData);
      setLoading(false)
    }
   } catch (error) {
    
   }finally{
    setLoading(false)
   }
  };

  useEffect(() => {
    handleFetchApi();
  }, [actionUser]);


  const handleClickRow = async (rowData: any) => {
    setSelectedRowData(rowData);
    setOpenDetail(true);
  };
  return (
    <div className={styles.products}>
      <div className={styles.info}>
        <h1>Published Products</h1>
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress color="primary" size={50} />
          <p>Loading...</p>
        </div>
      ) : (<>
      <DataTable
        slug="products"
        columns={columns}
        rows={listProduct}
        isUserPage={true}
        isDiscount={true}
        onRowClick={(rowData) => {
          handleClickRow(rowData.row);
        }}
      />
      </>)}
         {openDetail && (
        <Modal
          open={openDetail}
          onClose={() => setOpenDetail(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ProductDetail
          isDraft={false}
          selectedRowData={selectedRowData}
          isUserProduct={false}
          setOpen={setOpenDetail}
            userData={selectedRowData}
          />
        </Modal>
      )}
    </div>
  );
};

export default PublishedProducts;
