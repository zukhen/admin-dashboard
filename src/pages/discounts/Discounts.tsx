import { useEffect, useState } from "react";
import styles from "./discounts.module.scss";
import { columns, columns2 } from "./Discount-model";
// import DataTable from "@/components/dataTable/DataTable";
import Add from "../products/AddProduct";
import { handleQueryCategory } from "@/api/category";
import { handleQueryDiscount } from "@/api/discount";
import DataTable from "@/components/dataTable/DataTable";
import { convertToVietnamTime } from "@/utils/date-utils";

export default function Discounts() {
  const [open, setOpen] = useState(false);
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(false);
  const handleFetchApi = async (pageNumber?: number) => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchApi();
  }, []);
  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <h1>Discounts</h1>
        <button onClick={() => setOpen(true)}>Add New Discount</button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={discounts}
        onRowClick={() => {}}
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
      >
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

      {open && <Add slug="user" columns={columns2} setOpen={setOpen} />}
    </div>
  );
}
