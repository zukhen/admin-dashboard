import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
} from "@mui/x-data-grid";
import "./DataTable.scss";
import { MouseEventHandler } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  columns: GridColDef[];
  rows: object[];
  slug: string;
  isUserPage?: boolean;
  isOrderPage?: boolean;
  onRowClick: GridEventListener<"rowClick">;
  onActionUpdateClick?: MouseEventHandler<HTMLDivElement>;
  onActionDeleteClick?: MouseEventHandler<HTMLDivElement>;
};

const DataTable = (props: Props) => {
  const actionColumn: GridColDef = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: () => {
      return (
        <div className="action">
          <div onClick={props.onActionUpdateClick}>
            <img src="/view.svg" alt="" />
          </div>
          {/* <div className="delete" onClick={props.onActionDeleteClick}>
            <img src="/delete.svg" alt="" />
          </div> */}
        </div>
      );
    },
  };

  return (
    <div className="dataTable">
      <DataGrid
        className="dataGrid"
        rows={props.rows}
        columns={
          [...props.columns, !props.isUserPage ? actionColumn : null].filter(
            Boolean
          ) as readonly GridColDef<any>[]
        }
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        onRowClick={props.onRowClick}
        hideFooter
        pageSizeOptions={[10]}
        checkboxSelection={props.isOrderPage}
        disableRowSelectionOnClick
        disableColumnFilter
        disableDensitySelector
        disableColumnSelector
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default DataTable;

//data.module.scss
