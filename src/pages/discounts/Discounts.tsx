import { useEffect, useState } from "react";
import styles from "./discounts.module.scss";
import { columns, columns2 } from "./Discount-model";
// import DataTable from "@/components/dataTable/DataTable";
import Add from "./AddDiscount";
// import { handleQueryCategory } from "@/api/category";
import { handleQueryDiscount } from "@/api/discount";
import DataTable from "@/components/dataTable/DataTable";
import { convertToVietnamTime } from "@/utils/date-utils";
import { CircularProgress } from "@mui/material";

export default function Discounts() {
  const totalDiscountFromStorage = localStorage.getItem("totalDiscount");

  const [open, setOpen] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [isLoading, setisLoading] = useState(false)
  const handleFetchApi = async () => {
    try {
      setisLoading(true);
      const response = await handleQueryDiscount();
      if (response?.status === 200) {
        console.log(response.data.data);
        const modifiedData = response.data.data.map(
          (item: any, index: number) => {
            return {
              ...item,
              id: index + 1,
              discount_start_day: convertToVietnamTime(item.discount_start_day),
              discount_end_day: convertToVietnamTime(item.discount_end_day),
            };
          }
        );
        setDiscounts(modifiedData);
      } else {
        console.log(response?.status);

        // alert("Vui lòng đăng nhập lại");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setisLoading(false);
    }
  };
  useEffect(() => {
    handleFetchApi();
  }, [totalDiscountFromStorage]);
  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <h1>Discounts</h1>
        <button onClick={() => setOpen(true)}>Add New Discount</button>
      </div>
      {isLoading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress color="primary" size={50} />
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <DataTable
            slug="users"
            columns={columns}
            rows={discounts}
            onRowClick={() => { }}
            isUserPage={true}
            isDiscount={true}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: -2,
              paddingTop: "10px",
              backgroundColor: "white",
            }}
          ></div>
        </>
      )}
      {open && <Add slug="Discount" columns={columns2} setOpen={setOpen} />}
      {/* <Pagination
                    count={calculateTotalPages(
                        Number(splitTotalString(totalUserToShow.toString())[0])
                    )}
                    page={currentPage}
                    onChange={(_event, page) => handlePageChange(page)}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                /> */}
    </div>


  );
}
