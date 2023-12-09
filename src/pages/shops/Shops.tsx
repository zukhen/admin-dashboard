import DataTable from "@/components/dataTable/DataTable";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { calculateTotalPages } from "@/utils/pagination-utils";
import { splitTotalString } from "@/utils/modifield-string";
import { handleQueryUser } from "@/api/user";
import Add from "@/components/add/Add";
import { columns, columns2 } from "./Shop-model";
import styles from "./shop.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_TOTAL_USERS,
  actionSetTotalUsers,
} from "@/redux/action/user-action";
import { convertToVietnamTime } from "@/utils/date-utils";

export default function Shops() {
  const totalUserFromStorage = localStorage.getItem("totalUser");
  const totalUserToShow = totalUserFromStorage ? totalUserFromStorage : "12T8";
  const actionUser = useSelector((state: any) => state.user.isAddNewUser);
  const [open, setOpen] = useState(false);
  const [listUser, setListUser] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const handleFetchApi = async (pageNumber?: number) => {
    const response = await handleQueryUser(pageNumber, true);
    if (response?.status == 200) {
      console.log(response.data.data);
      
      const modifiedData = response.data.data.map(
        (item: any, index: number) => ({
          ...item,
          id: index + 1,
          product_price: `$${item.product_price}`,
          createdAt: convertToVietnamTime(item.createdAt),

        })
      );

      setListUser(modifiedData);
    }
  };
  useEffect(() => {
    handleFetchApi(currentPage);
  }, [actionUser]);

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    handleFetchApi(page);
  };
  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <h1>Shops</h1>
        <button
          onClick={() => {
            setOpen(true);
            dispatch(actionSetTotalUsers(SET_TOTAL_USERS, false));
          }}
        >
          Add New Shop
        </button>
      </div>
      <DataTable
        slug="users"
        columns={columns}
        rows={listUser}
        onRowClick={(rowData) => console.log(rowData)
        }
        isUserPage={true}
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
        <Pagination
          count={calculateTotalPages(
            Number(splitTotalString(totalUserToShow.toString())[0])
          )}
          page={currentPage}
          onChange={(_event, page) => handlePageChange(page)}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </div>

      {open && <Add slug="Shop" columns={columns2} setOpen={setOpen} />}
    </div>
  );
}
