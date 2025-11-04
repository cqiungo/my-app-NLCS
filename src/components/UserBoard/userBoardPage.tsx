"use client"
import * as React from "react"
import Box from "@mui/material/Box"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/DeleteOutlined"
import {
  type GridRowModesModel,
  DataGrid,
  type GridColDef,
  GridActionsCellItem,
  type GridEventListener,
  type GridRowId,
  GridRowEditStopReasons,
} from "@mui/x-data-grid"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import Animations from "../ui/another-skeleton"
import userService from "@/services/user.service"
import { useEffect } from "react"
import { useUser } from "@/context/UserContext"
import UserFormDialog from "@/components/App/UserFormDialog"
import EditUserForm from "../App/EditUserForm"
import { useRouter } from "next/navigation"

export default function FullFeaturedCrudGrid() {
  const router = useRouter()
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({})
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [selectedRowId, setSelectedRowId] = React.useState<GridRowId | null>(null)
  const [editFormOpen, setEditFormOpen] = React.useState(false)
  const token = useUser().user?.access_token
  const [user, setUser] = React.useState<any[]>([])
  const [form, setFormOpen] = React.useState(false)
  const [editUser, setEditUser] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(true)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await userService.getAll(token)
        setUser(response)
      } catch (error) {
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = false
    }
  }

  const handleEditClick = (id: GridRowId) => () => {
    console.log("handleEditClick", id)
    const tmp = user.find((row) => row.id === id)
    const ho = tmp.name.split(" ")[0]
    const ten = tmp.name.split(" ").slice(1).join(" ")
    console.log("tmp", tmp)
    setEditUser({
      id: id,
      ho: ho,
      ten: ten,
      address: tmp.address,
      phone: tmp.phone,
      email: tmp.email,
      role: tmp.role,
    })
    setEditFormOpen(true)
  }

  const handleDeleteClick = (id: GridRowId) => () => {
    setSelectedRowId(id)
    setOpenDeleteDialog(true)
  }

  const confirmDeleteRow = async () => {
    userService
      .delete(selectedRowId as string, token as string)
      .then(() => {
        if (selectedRowId !== null) {
          setUser((prevRows) => prevRows.filter((row) => row.id !== selectedRowId))
        }
        setOpenDeleteDialog(false)
        setSelectedRowId(null)
      })
      .catch((error) => {
        console.error("Error deleting user:", error)
      })
  }

  const handleSubmitUser = async (formData: any) => {
    try {
      const name = `${formData.ho} ${formData.ten}`
      const userData = {
        name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        role: formData.role || "user",
      }
      const response = await userService.create(formData)
      console.log("User created successfully:", response)
      setFormOpen(false)
      console.log("User data submitted:", formData)
    } catch (error) {
      console.error("Error creating user:", error)
    }
  }

  const handleEditUser = async (formData: any) => {
    try {
      const name = `${formData.ho} ${formData.ten}`
      const userData = {
        name,
        email: formData.email,
        phone: formData.phoneNumber,
        address: formData.address,
        role: formData.role || "user",
      }
      const response = await userService.update(editUser.id, userData, token)
      setEditFormOpen(false)
      setUser((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editUser._id
            ? {
                ...user,
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                address: userData.address,
                role: userData.role,
              }
            : user,
        ),
      )
    } catch (error) {
      console.error("Error updating user:", error)
    }
  }

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    {
      field: "role",
      headerName: "Department",
      type: "singleSelect",
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem key="edit-action" icon={<EditIcon />} label="Edit" onClick={handleEditClick(id)} />,
          <GridActionsCellItem
            key="delete-action"
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ]
      },
      flex: 1,
    },
  ]

  return (
    <>
      <Box
        sx={{
          width: "100%",
          "& .actions": { color: "text.secondary" },
          "& .textPrimary": { color: "text.primary" },
        }}
      >

        {loading ? (
          <Stack sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
            <CircularProgress />
          </Stack>
        ) : user.length > 0 ? (
          <DataGrid
            rows={user}
            getRowId={(row) => row.id}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={setRowModesModel}
            onRowEditStop={handleRowEditStop}
            showToolbar
            autoHeight
            pagination
            pageSizeOptions={[5, 10, 20]}
            initialState={{ pagination: { paginationModel: { pageSize: 5, page: 0 } } }}
          />
        ) : (
          <Animations />
        )}
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
        onClose={() => setFormOpen(false)}
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
  )
}
