import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "order_payment",
    type: "string",
    headerName: "Payment",
    width: 200,
  },
  {
    field: "order_note",
    type: "string",
    headerName: "Note",
    width: 200,
  },
  {
    field: "order_checkout",
    type: "string",
    headerName: "Total",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "order_status",
    type: "string",
    headerName: "Status",
    width: 100,
  },

  {
    field: "address",
    headerName: "Address",
    width: 450,
    type: "string",
  },
];

export const columns2: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "order_payment",
    type: "string",
    headerName: "Payment",
    width: 200,
  },

  {
    field: "order_checkout",
    type: "string",
    headerName: "Total",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },

  {
    field: "order_status",
    type: "string",
    headerName: "Status",
    width: 100,
  },
  {
    field: "order_reason",
    type: "string",
    headerName: "Reason",
    width: 250,
  },
  {
    field: "address",
    headerName: "Address",
    width: 450,
    type: "string",
  },
];
