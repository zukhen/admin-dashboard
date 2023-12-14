import React, { useState } from "react";
import styles from "./orders.module.scss";
import {
  convertVNDCurrencyformatting,

  modifyFirstCharacterString,
  truncateName,
} from "@/utils/modifield-string";
import { handleChangeStatusOrder } from "@/api/order";
import { orderStatus } from "@/model/order-status";
import { logError } from "@/api";
import { CircularProgress } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OrderDetailsProps {
  selectedRowData: any;
  userData: any;
  setOpen: (value: React.SetStateAction<boolean>) => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  selectedRowData,
  userData,
  setOpen,
}) => {
  const [prevStatus, setPrevStatus] = useState(selectedRowData?.order_status);
  const [selectedValue, setSelectedValue] = useState(prevStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleStatusChange = async () => {
    // console.log(selectedRowData._id);

    switch (selectedValue) {
      case orderStatus.confirmed:
        try {
          setIsLoading(true);
          let responseC = await handleChangeStatusOrder(
            selectedRowData._id,
            orderStatus.confirmed
          );
          if (responseC?.status === 200) {
            toast.success(responseC?.data.message, {
              autoClose: 1000
            });

            const delay = (ms: any) =>
              new Promise((resolve) => setTimeout(resolve, ms));

            await delay(1300);
            window.location.reload();
            setOpen(false);
          }
        } catch (error) {
          logError(error, "handleStatusChange");
        } finally {
          setIsLoading(false);
        }
        break;
      case orderStatus.shipping:
        try {
          setIsLoading(true);
          let responsS = await handleChangeStatusOrder(
            selectedRowData._id,
            orderStatus.shipping
          );
          if (responsS?.status === 200) {
            toast.success(responsS.data.message, {
              autoClose: 1000
            });

            const delay = (ms: any) =>
              new Promise((resolve) => setTimeout(resolve, ms));

            await delay(1000);
            //xoá cắt chim
            window.location.reload();
            setOpen(false);
          }
        } catch (error) {
          logError(error, "handleStatusChange");
        } finally {
          setIsLoading(false);
        }
        break;
    }

    setPrevStatus(selectedValue);
  };
  const onChange = (e: any) => {
    setSelectedValue(e.target.value);
  };
  console.log(selectedRowData);

  return (
    <div className={styles.register}>
      <div className={styles.containerRegister}>
        <div className={styles.titleHeader}>
          <div className={styles.rowContainer}>
            <h1 className={styles.titleRegister}>
              Order: {truncateName(selectedRowData?.name)}
            </h1>
            <img
              src={"/zgulV2zGm8t.png"}
              alt="close"
              onClick={() => setOpen(false)}
              width={30}
              height={30}
            />
          </div>
          {/* <p>Tracking number: {selectedRowData?.order_trackingNumber}</p> */}
          <p>Created At: {selectedRowData?.createdAt}</p>
          <hr style={{ marginTop: 10, marginBottom: 10 }} />
          <div className={styles.contentOrder}>
            <div className={styles.rowContent}>
              <h3>Payments: </h3>
              <p className={styles.titleContent}>
                {selectedRowData?.order_payment}
              </p>
            </div>

            <div className="">
              <h3 style={{ marginBottom: 8 }}>Order products</h3>
              <div className={styles.scrollWrapper}>
                <div className={styles.contentOrder}>
                  {selectedRowData?.order_products.map(
                    (product: any, index: any) => (
                      <div key={index} className={styles.rowItem}>
                        {/* ITEM PRODUCTS */}
                        {product.item_products.map(
                          (itemProduct: any, itemIndex: any) => (
                            <div
                              key={itemIndex}
                              className={styles.itemProducts}
                            >
                              <img
                                src={itemProduct.image}
                                className={styles.imageProducts}
                                alt={`Product ${itemIndex}`}
                              />
                              <div className={styles.orderInformation}>
                                <div className={styles.titleItemProducts}>
                                  <h2 className={styles.text}>
                                    {itemProduct.product_name}
                                  </h2>
                                  <h3 className={styles.text}>
                                    {convertVNDCurrencyformatting(itemProduct.price)}
                                  </h3>
                                  <h3 className={styles.text}>
                                    Quantity: {itemProduct.quantity}
                                  </h3>
                                </div>
                              </div>
                              <div className={styles.titleItemProducts}>
                                <h2 className={styles.text}>Total</h2>
                                <h3 className={styles.text}>
                                  {convertVNDCurrencyformatting(itemProduct.quantity * itemProduct.price)}
                                </h3>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* INFOR CUSTOMER */}
              <div className={styles.rowContent}>
                <h3 className={styles.text}>Discount: </h3>
                <p className={styles.text}>{selectedRowData?.order_products[0].priceRow - selectedRowData?.order_products[0].priceApplyDiscount}₫</p>
              </div>
              <div className={styles.rowContent}>
                <h3 className={styles.text}>Customer name: </h3>
                <p className={styles.text}>{userData?.name}</p>
              </div>
              <div className={styles.rowContent}>
                <h3 className={styles.text}>Customer email: </h3>
                <p className={styles.text}>{userData?.email}</p>
              </div>
              <div className={styles.rowContent}>
                <h3 className={styles.text}>Customer phone: </h3>
                <p className={styles.text}>{userData?.msisdn}</p>
              </div>
              {/* SHIPPING */}
              <div className={styles.rowContent}>
                <h3 className={styles.text}>Customer address: </h3>
                <p className={styles.text}>
                  {selectedRowData?.order_shipping.street},{" "}
                  {selectedRowData?.order_shipping.city}
                </p>
              </div>
              {selectedRowData?.order_status.toString() == "canceled" ||
                selectedRowData?.order_status.toString() == "shipping" ? (
                <div>
                  <div className={styles.rowContent}>
                    <h3>Status: </h3>
                    <p
                      style={{
                        fontWeight: "bold",
                        color:
                          selectedRowData?.order_status.toString() ===
                            "canceled"
                            ? "red"
                            : selectedRowData?.order_status.toString() ===
                              "confirmed"
                              ? "green"
                              : "#2a3447",
                      }}
                    >
                      {selectedRowData?.order_status.toString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.rowContent}>
                  <h3>Status</h3>
                  <div>
                    <label>
                      <input
                        type="radio"
                        name="orderStatus"
                        value={selectedRowData?.order_status}
                        checked={
                          selectedValue === selectedRowData?.order_status
                        }
                        onChange={onChange}
                      />
                      {modifyFirstCharacterString(
                        selectedRowData?.order_status
                      )}
                    </label>
                    {selectedRowData?.order_status == "pending" ? (
                      <>
                        <label>
                          <input
                            type="radio"
                            name="orderStatus"
                            value="confirmed"
                            checked={selectedValue === "confirmed"}
                            onChange={onChange}
                          />
                          Confirmed
                        </label>
                      </>
                    ) : (
                      <label>
                        <input
                          type="radio"
                          name="orderStatus"
                          value="shipping"
                          checked={selectedValue === "shipping"}
                          onChange={onChange}
                        />
                        Shipping
                      </label>
                    )}
                  </div>
                </div>
              )}
              {selectedRowData.order_reason && (
                <div className={styles.rowContent}>
                  <h3>Reason</h3>
                  <p>{selectedRowData.order_reason}</p>
                </div>
              )}
              {selectedRowData.order_note && (
                <div className={styles.rowContent}>
                  <h3>Note</h3>
                  <p>
                    {selectedRowData.order_note == ""
                      ? "NO"
                      : selectedRowData.order_note}
                  </p>
                </div>
              )}
              <div className={styles.rowContentTotalPrice}>
                <h1>Total Price: </h1>
                <h1 className="">{convertVNDCurrencyformatting(selectedRowData?.order_products[0].priceApplyDiscount)}</h1>
              </div>
              {prevStatus !== selectedValue &&
                (isLoading ? (
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress size={30} />
                  </div>
                ) : (
                  <div style={{ marginTop: 20, textAlign: "center" }}>
                    <button
                      style={{ width: "100%", padding: 15 }}
                      onClick={handleStatusChange}
                    >
                      Update
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
      />
    </div>
  );
};
export default OrderDetails;
