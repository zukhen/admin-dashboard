import { useState } from "react";
import styles from "./discounts.module.scss";
import {  columns2 } from "./Discount-model";
// import DataTable from "@/components/dataTable/DataTable";
import Add from "../products/AddProduct";

export default function Discounts() {
    const [open, setOpen] = useState(false);
    // const [discounts, setDiscounts] = useState([]);
    return (
        <div className={styles.users}>
            <div className={styles.info}>
                <h1>Discounts</h1>
                <button onClick={() => setOpen(true)}>Add New Discount</button>
            </div>
            {/* <DataTable
                slug="users"
                columns={columns}
                rows={discounts}
                onRowClick={() => { }}
                isUserPage={true}
            /> */}
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
    )
}