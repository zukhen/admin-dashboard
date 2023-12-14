import { GridColDef } from "@mui/x-data-grid";
import styles from "./users.module.scss";
import { useEffect, useState } from "react";
import { handleQueryUser } from "@/api/user";
import { CircularProgress, Pagination } from "@mui/material";
import { splitTotalString } from "@/utils/modifield-string";
import { calculateTotalPages } from "@/utils/pagination-utils";
import DataTable from "@/components/dataTable/DataTable";
import Add from "@/components/add/Add";
import { useSelector } from "react-redux";
import { convertToVietnamTime } from "@/utils/date-utils";
// import { useQuery } from "@tanstack/react-query";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "avatar",
    headerName: "Avatar",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.img || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email",
    width: 200,
  },
  {
    field: "msisdn",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "verify",
    headerName: "Verified",
    width: 150,
    type: "boolean",
  },
];

const Users = () => {
  const totalUserFromStorage = localStorage.getItem("totalUser") ?? "0";
  const renderUser = useSelector((state: any) => state.user.isAddNewUser)
  const [open, setOpen] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const handleFetchApi = async (pageNumber?: number) => {
    const response = await handleQueryUser(pageNumber);
    if (response?.status == 200) {
      // console.log(response.data.data);

      // const shopUsers = response.data.data.filter((user: any) =>
      //   user.roles.includes("USER")
      // );
      const modifiedData = response.data.data.map((item: any, index: number) => ({
        ...item,
        id: index + 1,
        createdAt: convertToVietnamTime(item.createdAt),

      }));
      setListUser(modifiedData);
    }
    setLoading(false)
  };
  useEffect(() => {
    setLoading(true)
    handleFetchApi();
  }, [renderUser]);
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    handleFetchApi(page);
  };

  return (
    <div className={styles.users}>
      <div className={styles.info}>
        <h1>Users</h1>
        {/* <button onClick={() => setOpen(true)}>Add New User</button> */}
      </div>
      {loading ? (
        <div className={styles.loadingContainer}>
          <CircularProgress color="primary" size={50} />
          <p>Loading...</p>
        </div>
      ) : <>
        <DataTable
          slug="users"
          columns={columns}
          rows={listUser}
          onRowClick={() => { }}
          isUserPage={true}
        />
        <div className={styles.pagination}>
          <Pagination
            count={
              calculateTotalPages(
                Number(splitTotalString(totalUserFromStorage.toString())[1])
              )
            }
            page={currentPage}
            onChange={(_event, page) => handlePageChange(page)}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </div>
      </>}
      {open && <Add slug="user" columns={columns} setOpen={setOpen} />}
    </div>
  );
};

export default Users;
