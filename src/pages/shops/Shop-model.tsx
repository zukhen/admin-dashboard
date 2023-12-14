import { GridColDef } from "@mui/x-data-grid";

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
        headerName: "Full name",
        width: 250,
    },
    {
        field: "msisdn",
        type: "string",
        headerName: "Phone",
        width: 200,
    },
    {
        field: "email",
        type: "string",
        headerName: "Email",
        width: 350,
    },
    // {
    //     field: "password",
    //     type: "password",
    //     headerName: "Password",
    //     width: 200,
    // },

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
const columns2: GridColDef[] = [
    // { field: "id", headerName: "ID", width: 90 },

    {
        field: "name",
        type: "string",
        headerName: "Full name",
        width: 150,
    },

    {
        field: "msisdn",
        type: "string",
        headerName: "Phone",
        width: 200,
    },
    {
        field: "email",
        type: "string",
        headerName: "Email",
        width: 200,
    },
    {
        field: "password",
        type: "password",
        headerName: "Password",
        width: 200,
    },
    {
        field: "address",
        type: "address",
        headerName: "Address",
        width: 200,
    },
];
export { columns, columns2 }