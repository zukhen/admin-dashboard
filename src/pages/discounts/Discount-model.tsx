import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "name",
        type: "string",
        headerName: "Discount's name",
        width: 150,
    },
    {
        field: "price",
        type: "double",
        headerName: "Price",
        width: 200,
    },
    {
        field: "quantity",
        type: "int",
        headerName: "Quantity",
        width: 200,
    },
    {
        field: "endTime",
        headerName: "End time",
        width: 200,
        type: "string",
    },
];

const columns2: GridColDef[] = [
    {
        field: "name",
        type: "string",
        headerName: "Discount's name",
        width: 150,
    },
    {
        field: "price",
        type: "double",
        headerName: "Price",
        width: 200,
    },
    {
        field: "quantity",
        type: "int",
        headerName: "Quantity",
        width: 200,
    },
    {
        field: "endTime",
        headerName: "End time",
        width: 200,
        type: "date",
    },
];
export { columns, columns2 }