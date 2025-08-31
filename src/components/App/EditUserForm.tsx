"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, MenuItem } from "@mui/material"
import Grid from "@mui/material/Grid"

interface UserFormData {
  ho: string,
  ten: string,
  address: string
  phoneNumber: string
  email: string,
  role: string
}
const role = [
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  }
]
interface UserFormDialogProps {
  user: UserFormData
  open: boolean
  onClose: () => void
  onSubmit: (userData: UserFormData) => void
  
}

export default function UserFormEditDialog({ user ,open, onClose, onSubmit }: UserFormDialogProps) {
  const [formData, setFormData] = useState<UserFormData>({
    ho: user.ho,
    ten: user.ten,
    address: user.address,
    phoneNumber: user.phoneNumber,
    email: user.email,
    role: user.role,
  })
  if(open){
    console.log("UserFormEditDialog open", formData);
  }
  useEffect(() => {
  if (user) {
    setFormData({
      ho: user.ho || "",
      ten: user.ten || "",
      address: user.address || "",
      phoneNumber: user.phoneNumber || "",
      email: user.email || "",
      role: user.role || "",
    });
  }
}, [user]);

  const [errors, setErrors] = useState<Partial<UserFormData>>({})

  const handleInputChange = (field: keyof UserFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {}

    if (!formData.ho.trim()) {
      newErrors.ho = "Họ tên là bắt buộc"
    }

    if (!formData.ten.trim()) {
      newErrors.ten = "Tên là bắt buộc"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Địa chỉ là bắt buộc"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Số điện thoại là bắt buộc"
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Số điện thoại không hợp lệ"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      handleClose()
    }
  }

  const handleClose = () => {
    setFormData({
      ho: "",
      ten: "",
      address: "",
      phoneNumber: "",
      email: "",
      role: "",
    })
    setErrors({})
    onClose()
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Typography fontWeight="600">
          Cập nhật
        </Typography>
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={3}>
            <Grid size={6}>
              <TextField
                fullWidth
                label="Họ"
                value={formData.ho}
                onChange={handleInputChange("ho")}
                error={!!errors.ho}
                helperText={errors.ho}
                variant="standard"
                required
              />
            </Grid>

            <Grid size={6}>
              <TextField
                fullWidth
                label="Tên"
                value={formData.ten}
                onChange={handleInputChange("ten")}
                error={!!errors.ten}
                helperText={errors.ten}
                variant="standard"
                required
              />
            </Grid>

            <Grid size={12} sx={{xs:12, sm: 6 }}>
              <TextField
                fullWidth
                label="Địa chỉ"
                value={formData.address}
                onChange={handleInputChange("address")}
                error={!!errors.address}
                helperText={errors.address}
                variant="standard"
                required
              />
              
            </Grid>
                <Grid size={12}>
                <TextField
                fullWidth
                label="Số điện thoại"
                value={formData.phoneNumber}
                onChange={handleInputChange("phoneNumber")}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                variant="standard"
                required
                />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                variant="standard"
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                id="outlined-select-currency-native"
                select
                defaultValue="User"
                value={formData.role}
                onChange={handleInputChange("role")}
                error={!!errors.role}
                helperText={errors.role}
                variant="standard"
                required
              >
                <option value="" disabled>
                  Chọn vai trò
                </option>
                {role.map((option) => (
                  <MenuItem  key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem >
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleClose}  sx={{ mr: 1 }}>
            Hủy
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
              },
            }}
          >
            Xác nhận
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}
