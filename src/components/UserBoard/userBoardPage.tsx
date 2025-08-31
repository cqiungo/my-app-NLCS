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
import Animations from '../ui/another-skeleton';
import Badge from '@mui/material/Badge';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import FilterListIcon from '@mui/icons-material/FilterList';
import userService from '@/services/user.service';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUser } from '@/context/UserContext';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import UserFormDialog from '@/components/App/UserFormDialog';
import EditUserForm from '../App/EditUserForm';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

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

  const createEmptyRow = () => {
    const id = randomId();
    return {
      id,
      name: '',
      email: null,
      phone: '',
      role: '',
      isNew: true,
    };
  };


  return (
    <Toolbar>
      <Tooltip title="Thêm dòng mới">
        <ToolbarButton>
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

export default function FullFeaturedCrudGrid() {
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null);
  const [editFormOpen, setEditFormOpen] = React.useState(false);
  const token = useUser().user?.access_token;
  const [user, setUser] = React.useState<any[]>([]);
  const [form,setFormOpen] = React.useState(false);
  const [editUser,setEditUser] = React.useState<any>(null);
  const Usersrow : GridRowsProp = [...user]
  const handleFormOpen =()=>{
    setFormOpen(true);
  }
  const handleFormClose =() =>{
    setFormOpen(false);
  }
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAll(token);
        setUser(response);
      } catch (error) {
      }
    }
    fetchUsers();
  }, []);
  const [rows, setRows] = React.useState(Usersrow);

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false;
    }
  };
  const handleEditClick = (id: GridRowId) => () => {
    console.log("handleEditClick", id);
    const tmp = user.find((row) => row._id === id);
    const ho = tmp.name.split(' ')[0];
    const ten = tmp.name.split(' ').slice(1).join(' ');
    console.log("tmp", tmp);
    setEditUser({
      id:id,
      ho: ho,
      ten: ten,
      address: tmp.address,
      phone: tmp.phone,
      email: tmp.email,
      role: tmp.role,
    });
    setEditFormOpen(true);
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

  const handleSubmitUser = async (formData: any) => {
    try {
      const name = `${formData.ho} ${formData.ten}`;
      const userData = {
        name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: formData.role || 'user', // Default role if not provided
      };
      // const response = await userService.create(formData);
      // console.log("User created successfully:", response);
      // setFormOpen(false);
      // // Optionally, you can fetch the updated user list or add the new user to the state
      // setUser((prevUsers) => [...prevUsers, response]);
      console.log("User data submitted:", formData);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  const handleEditUser = async (formData: any) =>{
    try {

      const name = `${formData.ho} ${formData.ten}`;
      const userData = {
        name,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address,
        role: formData.role || 'user', // Default role if not provided
      };
      const response = await userService.update(editUser.id, userData, token);
      console.log("User updated successfully:", response);
      setEditFormOpen(false);
      // Optionally, you can fetch the updated user list or update the user in the state
      setUser((prevUsers) => prevUsers.map((user) => (user._id === editUser._id ? {
        ...user,
        name: userData.name, // Ensure the name is updated correctly
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        role: userData.role, // Ensure the role is updated correctly
      } : user)));
    }
    catch (error) {
      console.error("Error updating user:", error);
    }
  }
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name',  flex: 1 },
    { field: 'email', headerName: 'Email',  flex: 1 },
    { field: 'phone', headerName: 'Phone',  flex: 1 },
    {
      field: 'role',
      headerName: 'Department',
      type: 'singleSelect',
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      getActions: ({ id }) => {
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
    
    <Dialog open={false}>
      <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
      <Box
        sx={{
          width: '100%',
          '& .actions': { color: 'text.secondary' },
          '& .textPrimary': { color: 'text.primary' },
        }}
      >
        <Button onClick={() => setFormOpen(true)}
        sx={{
          p:2,
          mb:3
        }}>Thêm người dùng</Button>
        { user.length >0 &&
          <DataGrid
          rows={user}
          getRowId={(row) => row._id}
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
        }
        {
          user.length === 0 &&
          <Animations/>
        }
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
        <UserFormDialog
          open={form}
          onClose={handleFormClose}
          onSubmit={handleSubmitUser}
          user={{
            ho: "",
            ten: "",
            address: "",
            phoneNumber: "",
            email: "",
            role: "",
          }}
        />    
        <EditUserForm
              open={editFormOpen}
              onClose={() => setEditFormOpen(false)}
              onSubmit={handleEditUser}
              user={{
                ho: editUser?.ho || "",
                ten: editUser?.ten || "",
                address: editUser?.address || "",
                phoneNumber: editUser?.phone || "",
                email: editUser?.email || "",
                role: editUser?.role || "",
              }}
              />

      </>
  );
}


