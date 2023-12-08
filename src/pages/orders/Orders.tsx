import styles from "./orders.module.scss";
import "@/pages/register/register.scss";
import { useEffect, useState } from "react";
import { CircularProgress, Modal, Pagination } from "@mui/material";
import { calculateTotalPages } from "@/utils/pagination-utils";
import { handleGetOrderProduct } from "@/api/order";
import { handleGetUserInformation } from "@/api/shop";
import OrderDetails from "./order-details";
import DataTable from "@/components/dataTable/DataTable";
import { splitTotalString, truncateName } from "@/utils/modifield-string";
import { orderStatus } from "@/model/order-status";
import { columns, columns2 } from "./order-model";

interface Props {
  status: string;
}

const Orders = ({ status }: Props) => {
  const [open, setOpen] = useState(false);
  const [listOrder, setListOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState<UserModel>();
  const [selectedRowData, setSelectedRowData] = useState<OrderModel>();
  const [loading, setLoading] = useState(false);
  const totalOrderFromStorage = localStorage.getItem("totalUser") ?? "0";

  const handleFetchApi = async (pageNumber?: number) => {
    try {
      setLoading(true);
      const response = await handleGetOrderProduct(pageNumber, status);
      if (response?.status === 200) {
        console.log(response.data.data);
        
        const modifiedData = response.data.data.map(
          (item: any, index: number) => {
            const products = item.order_products.flatMap((orderProduct: any) =>
              orderProduct.item_products.map(
                (product: any) => product.product_name
              )
            );
            const utcTime = new Date(item.createdOn);
            const vietnamTime = new Date(
              utcTime.getTime() + 7 * 60 * 60 * 1000
            );

            return {
              ...item,
              id: index + 1,
              name: truncateName(products.toString()),
              createdAt: vietnamTime
                .toISOString()
                .replace("T", " | ")
                .replace(/\.\d{3}Z/, ""),
              order_checkout: item.order_checkout.totalPrice,
              address: `${item.order_shipping.street}, ${item.order_shipping.city}`,
            };
          }
        );

        setListOrder(modifiedData);
      } else {
        console.log(response?.status);

        // alert("Vui lòng đăng nhập lại");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchApi(currentPage);
  }, [status]);

  const handleClickRow = async (rowData: any) => {
    setSelectedRowData(rowData);
    setOpen(true);
    const response = await handleGetUserInformation(
      rowData.order_shipping.user_id
    );
    if (response?.status === 200) {
      setUserData(response.data.data);
    }
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    handleFetchApi(page);
  };

  const totalItem = () => {
    const totalItemsArray = splitTotalString(totalOrderFromStorage.toString());

    switch (status) {
      case orderStatus.pending:
        return parseInt(totalItemsArray[1], 10) || 0;
      case orderStatus.confirmed:
        return parseInt(totalItemsArray[2], 10) || 0;
      case orderStatus.shipping:
        return parseInt(totalItemsArray[3], 10) || 0;
      case orderStatus.canceled:
        return parseInt(totalItemsArray[4], 10) || 0;
      case orderStatus.delivered:
        return parseInt(totalItemsArray[5], 10) || 0;
      default:
        return 0;
    }
  };

  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <h1>Orders {status}</h1>
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress color="primary" size={50} />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {listOrder.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <>
              <DataTable
                slug="users"
                onRowClick={(rowData) => handleClickRow(rowData.row)}
                columns={status == orderStatus.canceled ? columns2 : columns}
                rows={listOrder}
                isUserPage={true}
                isOrderPage={false}
              />

              <div className={styles.pagination}>
                <Pagination
                  count={calculateTotalPages(totalItem())}
                  page={currentPage}
                  onChange={(_event, page) => handlePageChange(page)}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                />
              </div>

              {open && (
                <Modal
                  open={open}
                  onClose={() => setOpen(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <OrderDetails
                    selectedRowData={selectedRowData}
                    setOpen={setOpen}
                    userData={userData}
                  />
                </Modal>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
export default Orders;
