import { GridColDef } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "discount_name",
    type: "string",
    headerName: "Discount's Name",
    width: 180,
  },
  { field: "discount_type", type: "double", headerName: "Type", width: 120 },
  { field: "discount_value", type: "int", headerName: "Value", width: 120 },
  { field: "discount_code", headerName: "Code", width: 120, type: "string" },
  {
    field: "discount_start_day",
    headerName: "Start Date",
    width: 180,
    type: "string",
  },
  {
    field: "discount_end_day",
    headerName: "End Date",
    width: 180,
    type: "string",
  },
  {
    field: "discount_max_uses",
    headerName: "Max Uses",
    width: 100,
    type: "string",
  },
  {
    field: "discount_uses_count",
    headerName: "Uses Count",
    width: 120,
    type: "string",
  },
  {
    field: "discount_max_uses_per_user",
    headerName: "Max Uses/User",
    width: 150,
    type: "string",
  },
  {
    field: "discount_is_active",
    headerName: "Active",
    width: 100,
    type: "boolean",
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
export { columns, columns2 };
