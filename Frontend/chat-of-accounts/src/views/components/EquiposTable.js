import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { ModeEditOutlineOutlined, DeleteOutlineRounded } from '@mui/icons-material';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as xlsx from "xlsx";

import TableCustom from "./TableCustom";

import { getDatas } from "redux/actions/CatalogsActions";
import { DeleteData } from "redux/actions/CatalogsActions";
import { setData } from "redux/actions/CatalogsActions";

import { useSearch } from "hooks/useSearch";
import { importData } from "redux/actions/CatalogsActions";
import { clearData } from "redux/actions/CatalogsActions";
import DrawerAccountEdit from "./DrawerAccountEdit";

const useStyles = makeStyles((theme) => ({
  removeicon: {
      color: theme.palette.error.main,
  },
  addicon: {
      color: theme.palette.success.main,
  },
  updateIcon: {
      color: theme.palette.warning.light,
  },
  viewIcon: {
      color: theme.palette.gray,
  },
}));

const EquiposTable = () => {

  const classes = useStyles();
  const dispatch = useDispatch();
  const datas = useSelector(state => state.catalog.datas);
  const [, , isCreating, , , , , handleOpen, handleClose] = useSearch();

  useEffect(() => {
    
    dispatch(getDatas('account/'))
    
    return () => {
      dispatch(clearData())
    }
  }, [])
  

  let data = {
    rows: datas.map((e) => ({
      id: e.Account,
      acctype: e.AcctType,
      description: e.Description,
      department: e.Department,  
      typicalbal: e.TypicalBal,
    })),
    columns: [
      {
        field: "id",
        headerName: "Account",
        flex: 0.7,
      },
      {
        field: "acctype",
        headerName: "AcctType",
        flex: 0.7,
      },
      {
        field: "description", 
        headerName: "Description",
        flex: 2.3,
      },
      {
        field: "department",
        headerName: "Department",
        flex: 1.3,
      },
      {
        field: "typicalbal",
        headerName: "TypicalBal",
        flex: 0.7,
      },
      {
        field: "actions",
        headerName: "Acciones",
        flex: 0.7,
        renderCell: (params) => {
          return [
            <GridActionsCellItem
              icon={<ModeEditOutlineOutlined className={classes.updateIcon} />}
              label="Edit"
              onClick={(e) => {
                e.preventDefault();
                handleOpen(e);
                params.api.selectRow(params.id);
                dispatch(setData(datas.find((data) => data.Account === params.id)));
              }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteOutlineRounded className={classes.removeicon} />}
              label="Delete"
              onClick={(e) => {
                e.preventDefault();
                Swal.fire({
                  title: "¿Está seguro?",
                  text: "¡No podrás revertir esto!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "¡Sí, bórralo!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(
                      DeleteData(params.id, `account/delete/${params.id}`)
                    );
                  }
                });
              }}
              color="inherit"
            />,
          ];
        },
      },
    ],
  };

  const readUploadFile = (e) => {
    e.preventDefault();

    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = xlsx.utils.sheet_to_json(worksheet);
          dispatch(importData(json, 'account/import'))

      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '15px 0px' }}>
      <TableCustom 
        data={data}
        drawerComponent={()=> {}}
        drawerComponentEdit={DrawerAccountEdit}
        isEditing={isCreating}
        handleCloseEdit={handleClose}
        UploadFile={readUploadFile}
      />
    </Box>
  );
};

export default EquiposTable;
