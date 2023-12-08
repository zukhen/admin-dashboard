import { GridColDef } from "@mui/x-data-grid";

export const categoryColumns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 200 },
  {
    field: "category_image",
    headerName: "Image",
    width: 200,
    renderCell: (params) => {
      return <img src={params.row.category_image || "/noavatar.png"} alt="" />;
    },
  },
  {
    field: "category_name",
    type: "string",
    headerName: "Name",
    width: 200,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: "Created At",
    width: 280,
  },
  {
    field: "updatedAt",
    type: "string",
    headerName: "Updated At",
    width: 200,
  },
];
