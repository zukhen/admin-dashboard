import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "product_name",
    type: "string",
    headerName: "Title",
    width: 200,
  },
  {
    field: "product_quality",
    type: "string",
    headerName: "Quantity",
    width: 150,
  },
  {
    field: "product_price",
    type: "string",
    headerName: "Price",
    width: 200,
  },
  {
    field: "product_description",
    headerName: "Description",
    type: "string",
    width: 350,
  },
  {
    field: "createdAt",
    headerName: "Created At",
    width: 200,
    type: "string",
  },
  {
    field: "product_ratingsAverage",
    headerName: "Rating",
    width: 150,
    type: "string",
  },
];


export const formColumns: GridColDef[] = [
  // { field: "id", headerName: "ID", width: 90 },
  {
    field: "product_name",
    type: "string",
    headerName: "Name",
    width: 150,
  },
  {
    field: "product_description",
    type: "string",
    headerName: "Description",
    width: 200,
  },
  {
    field: "product_price",
    headerName: "Price",
    type: "number",
    width: 90,
  },
  {
    field: "product_quality",
    headerName: "Quality",
    type: "number",
    width: 90,
  },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return <img src={params.row.image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "categoryId",
    type: "string",
    headerName: "Category type",
    width: 200,
  },
  // {
  //   field: "product_thumb",
  //   type: "string",
  //   headerName: "Thumb",
  //   width: 150,
  // },
  // {
  //   field: "product_slug",
  //   headerName: "Slug",
  //   type: "string",
  //   width: 200,
  // },
  // {
  //   field: "createdAt",
  //   headerName: "Created At",
  //   width: 200,
  //   type: "string",
  // },
  // {
  //   field: "product_ratingsAverage",
  //   headerName: "Rating",
  //   width: 150,
  //   type: "string",
  // },
];