'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlotProps,
  Toolbar,
  ToolbarButton,
  useGridApiContext,
  ColumnsPanelTrigger,
  FilterPanelTrigger,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { Typography } from 'antd';
import Badge from '@mui/material/Badge';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import userService from '@/services/user.service';
const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => randomArrayItem(roles);

function EditToolbar(props: GridSlotProps['toolbar']) {
  const apiRef = useGridApiContext();
  const [newPanelOpen, setNewPanelOpen] = React.useState(false);
  const newPanelTriggerRef = React.useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    setNewPanelOpen(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    apiRef.current.updateRows([
      {
        id: randomId(),
        commodity: formData.get('commodity'),
        quantity: Number(formData.get('quantity')),
        unitPrice: Number(formData.get('unitPrice')),
      },
    ]);
    handleClose();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  const { setRows, setRowModesModel } = props;
  const createEmptyRow = () => {
    const id = randomId();
    return {
      id,
      name: '',
      age: null,
      joinDate: null,
      role: '',
      x: '',
      a: '',
      c: '',
      isNew: true,
    };
  };

  const handleAddClick = () => {
    const newRow = createEmptyRow();
    setRows((oldRows) => [...oldRows, newRow]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [newRow.id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' }, // ✅ dùng đúng ID
    }));
  };

  return (
    <Toolbar>
      <Tooltip title="Thêm dòng mới">
        <ToolbarButton onClick={handleAddClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>

      <Popper
        open={newPanelOpen}
        anchorEl={newPanelTriggerRef.current}
        placement="bottom-end"
        id="new-panel"
        onKeyDown={handleKeyDown}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 300,
              p: 2,
            }}
            elevation={8}
          >
            <Typography >Add new commodity</Typography>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Commodity"
                  name="commodity"
                  size="small"
                  autoFocus
                  fullWidth
                  required
                />
                <TextField
                  label="Quantity"
                  type="number"
                  name="quantity"
                  size="small"
                  fullWidth
                  required
                />
                <TextField
                  label="Price"
                  type="number"
                  name="unitPrice"
                  size="small"
                  fullWidth
                  required
                />
                <Button type="submit" variant="contained" fullWidth>
                  Add Commodity
                </Button>
              </Stack>
            </form>
          </Paper>
        </ClickAwayListener>
      </Popper>

      <Tooltip title="Columns">
        <ColumnsPanelTrigger render={<ToolbarButton />}>
          <ViewColumnIcon fontSize="small" />
        </ColumnsPanelTrigger>
      </Tooltip>

      <Tooltip title="Filters">
        <FilterPanelTrigger
          render={(props, state) => (
            <ToolbarButton {...props} color="default">
              <Badge badgeContent={state.filterCount} color="primary" variant="dot">
                <FilterListIcon fontSize="small" />
              </Badge>
            </ToolbarButton>
          )}
        />
      </Tooltip>
    </Toolbar>
  );
}

const initialRows: GridRowsProp = [
  {
    id: randomId(),
    name: randomTraderName(),
    age: 25,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 36,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 19,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 28,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
  {
    id: randomId(),
    name: randomTraderName(),
    age: 23,
    joinDate: randomCreatedDate(),
    role: randomRole(),
  },
];

export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };
  const test = async ()=>{
    const a = await userService.getAll();
    console.log(a);
  }
  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.Edit } }));
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({ ...prev, [id]: { mode: GridRowModes.View } }));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel((prev) => ({
      ...prev,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    }));

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow?.isNew) {
      setRows((prev) => prev.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedRowId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDeleteRow = () => {
    if (selectedRowId !== null) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== selectedRowId));
    }
    setOpenDeleteDialog(false);
    setSelectedRowId(null);
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows((prevRows) => prevRows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newModel: GridRowModesModel) => {
    setRowModesModel(newModel);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', editable: true, flex: 1 },
    { field: 'age', headerName: 'Age', type: 'number', editable: true, flex: 1 },
    { field: 'joinDate', headerName: 'Join date', type: 'date', editable: true, flex: 1 },
    {
      field: 'role',
      headerName: 'Department',
      editable: true,
      type: 'singleSelect',
      valueOptions: roles,
      flex: 1,
    },
    { field: 'x', headerName: 'b', editable: true, flex: 1 },
    { field: 'a', headerName: 'bcc', editable: true, flex: 1 },
    { field: 'c', headerName: 'abcc', editable: true, flex: 1 },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem icon={<SaveIcon />} label="Save" onClick={handleSaveClick(id)} />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
      flex: 1,
    },
  ];

  return (
    <>
      <Box
        sx={{
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': { color: 'text.primary' },
        }}
      >
        <Button 
        onClick={test}
        sx={{
          p:2,
          mb:3
        }}>fjdslkajfkdsf</Button>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          // slots={{ toolbar: EditToolbar }}
          // slotProps={{ toolbar: { setRows, setRowModesModel } }}
          showToolbar
          autoHeight
          pagination
          pageSizeOptions={[5, 10, 20]}
          initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
        />
      </Box>

      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa dòng này không? Hành động này không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="inherit">
            Hủy
          </Button>
          <Button onClick={confirmDeleteRow} color="error" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


