"use client"
import productService from "@/services/product.service"
import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Upload, X } from "lucide-react"
import categoryService from "@/services/category.service"
import { useUser } from "@/context/UserContext"
import colorService from "@/services/color.service"
import capacityService from "@/services/capacity.service"

interface FormData {
  id?: number | null
  name: string
  description: string
  price: string
  quantity: string
  category: string
  categoryId?: string
  images: (File | string)[]
  imageUrl?: string
  colors?: number[]
  capacities?: number[]
}

interface ProductFormDialogProps {
  isOpen: boolean
  data?: FormData
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function ProductFormDialog({ isOpen, onOpenChange, data, onSuccess }: ProductFormDialogProps) {
  const isEditMode = Boolean(data?.id)
  const [errorMessage, setErrorMessage] = useState("")
  const [colors, setColors] = useState<Array<{ value: number; label: string }>>([])
  const [capacities, setCapacities] = useState<Array<{ value: number; label: string }>>([])
  const [formData, setFormData] = useState<FormData>({
    id: data?.id || null,
    name: data?.name || "",
    description: data?.description || "",
    price: data?.price || "",
    quantity: data?.quantity || "",
    category: data?.category || "",
    categoryId: data?.categoryId || "",
    imageUrl: data?.imageUrl,
    images: [
      ...(Array.isArray(data?.images) ? data.images : data?.images ? [data.images] : []),
      ...(data?.imageUrl !== undefined ? [data.imageUrl] : []),
    ].filter((img): img is string | File => img !== undefined),
    colors: data?.colors || [],
    capacities: data?.capacities || [],
  })
  
  const [categories, setCategories] = useState<Array<{ value: string; label: string }>>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    Array.isArray(data?.images)
      ? data.images.filter((img): img is string => typeof img === "string")
      : typeof data?.images === "string"
        ? [data.images]
        : [],
  )
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const token = useUser().user?.access_token || ""
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, colorRes, capRes] = await Promise.all([
          categoryService.getAll(),
          colorService.getAll(),
          capacityService.getAll(),
        ])
        setCategories((catRes.data || catRes).map((c: any) => ({ value: String(c.id), label: c.name })))
        setColors((colorRes.data || colorRes).map((c: any) => ({ value: (c.id), label: c.name })))
        setCapacities((capRes.data || capRes).map((c: any) => ({ value: (c.id), label: c.name })))
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    
    if (formData && data) {
      setFormData({
        id: data.id || null,
        name: data.name || "",
        description: data.description || "",
        price: data.price || "",
        quantity: data.quantity || "",
        category: data.categoryId ? String(data.categoryId) : "",
        categoryId: data.categoryId || "",
        images: Array.isArray(data.images) ? data.images : data.images ? [data.images] : [],
        colors: data?.colors || [],
        capacities: data?.capacities || [],
      })
      console.log("formData", data)
      const stringImages = Array.isArray(data.images)
        ? data.images.filter((img): img is string => typeof img === "string")
        : typeof data.images === "string"
          ? [data.images]
          : []
      setImagePreviews(stringImages)
    } else {
      resetForm()
    }
  }, [data])
  // Remove this useEffect to prevent infinite loop and the error.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }))
  }

  const handleColorToggle = (colorValue: number) => {
    console.log(colorValue)
    setFormData((prev) => {
      const currentColors = prev.colors || []
      const isSelected = currentColors.includes(colorValue)
      return {
        ...prev,
        colors: isSelected 
        ? currentColors.filter((c) => c !== colorValue) 
        : [...currentColors, colorValue],
      }
    })
  }

  const handleCapacityToggle = (capacityValue: number) => {
    console.log(capacityValue)
    setFormData((prev) => {
      const currentCapacities = prev.capacities || []
      const isSelected = currentCapacities.includes(capacityValue)
      return {
        ...prev,
        capacities: isSelected
          ? currentCapacities.filter((c) => c !== capacityValue)
          : [...currentCapacities, capacityValue],
      }
    })
  }

  const removeColor = (colorValue: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: (prev.colors || []).filter((c) => c !== colorValue),
    }))
  }

  const removeCapacity = (capacityValue: number) => {
    setFormData((prev) => ({
      ...prev,
      capacities: (prev.capacities || []).filter((c) => c !== capacityValue),
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, file],
        }))
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const files = e.dataTransfer.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, file],
          }))
          const reader = new FileReader()
          reader.onloadend = () => {
            setImagePreviews((prev) => [...prev, reader.result as string])
          }
          reader.readAsDataURL(file)
        }
      })
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      quantity: "",
      category: "",
      images: [],
      colors: [],
      capacities: [],
    })
    setImagePreviews([])
    setSuccessMessage("")
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.price ||
      !formData.quantity ||
      !formData.category ||
      formData.images.length === 0 ||
      !formData.colors ||
      formData.colors.length === 0 ||
      !formData.capacities ||
      formData.capacities.length === 0
    ) {
      setErrorMessage("Vui lòng điền đầy đủ thông tin, chọn ít nhất 1 hình ảnh, 1 màu sắc và 1 dung lượng.")
      setIsSubmitting(false)
      return
    }

    if (Number(formData.price) <= 0 || Number(formData.quantity) <= 0) {
      setErrorMessage("Giá và số lượng phải lớn hơn 0.")
      setIsSubmitting(false)
      return
    }

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        price: Number.parseFloat(formData.price),
        quantity: Number.parseInt(formData.quantity, 10),
        categoryId: Number.parseInt(formData.category || "0", 10),
        images: formData.images,
        color: formData.colors,
        capacity: formData.capacities,
      }

      let response
      if (isEditMode && formData.id) {
        console.log("Updating product with payload:", payload)
        response = await productService.update(formData.id, payload, token)
        setSuccessMessage("Sản phẩm đã được cập nhật thành công!")
      } else {
        response = await productService.create(payload, token)
        setSuccessMessage("Sản phẩm đã được thêm thành công!")
      }

      setTimeout(() => {
        resetForm()
        onOpenChange(false)
        onSuccess?.()
      }, 1500)
    } catch (error) {
      console.error("Error submitting product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  const getColorLabel = (value: number) => {
    return colors.find((c) => String(c.value) === String(value))?.label || value
  }

  const getCapacityLabel = (value: number) => {
    return capacities.find((c) => String(c.value) === String(value))?.label || value
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Chỉnh Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}</DialogTitle>
          <DialogDescription>
            {isEditMode ? "Cập nhật thông tin sản phẩm của bạn" : "Điền đầy đủ thông tin sản phẩm của bạn"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {successMessage && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">{successMessage}</div>
          )}

          <div className="space-y-3">
            <Label className="text-base font-semibold">Hình Ảnh Sản Phẩm ({imagePreviews.length})</Label>
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview || "/placeholder.svg"}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-border"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 p-1.5 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
            >
              <input
                type="file"
                id="image-input"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                multiple
              />
              <label htmlFor="image-input" className="cursor-pointer block">
                <Upload className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">Kéo thả hình ảnh hoặc nhấp để chọn</p>
                <p className="text-xs text-muted-foreground">Hỗ trợ: JPG, PNG, GIF</p>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên Sản Phẩm *</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô Tả *</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Giá (VNĐ) *</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                required
                min="0"
                step="1000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Số Lượng *</Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                value={formData.quantity}
                onChange={handleInputChange}
                required
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Loại Sản Phẩm *</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Chọn loại sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Màu Sắc * ({(formData.colors || []).length} được chọn)</Label>
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    onClick={() => handleColorToggle(color.value)}
                    className={`p-2 rounded-lg border-2 transition-all text-sm font-medium ${
                      (formData.colors || []).includes(color.value)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {color.label}
                  </button>
                ))}
              </div>
              {(formData.colors || []).length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {(formData.colors || []).map((colorValue) => (
                    <div
                      key={colorValue}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {getColorLabel(colorValue)}
                      <button type="button" onClick={() => removeColor(colorValue)} className="hover:text-primary/70">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Dung Lượng * ({(formData.capacities || []).length} được chọn)</Label>
            <div className="border border-border rounded-lg p-3 space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto">
                {capacities.map((capacity) => (
                  <button
                    key={capacity.value}
                    type="button"
                    onClick={() => handleCapacityToggle(capacity.value)}
                    className={`p-2 rounded-lg border-2 transition-all text-sm font-medium ${
                      (formData.capacities || []).includes(capacity.value)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-foreground hover:border-primary/50"
                    }`}
                  >
                    {capacity.label}
                  </button>
                ))}
              </div>
              {(formData.capacities || []).length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {(formData.capacities || []).map((capacityValue) => (
                    <div
                      key={capacityValue}
                      className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {getCapacityLabel(capacityValue)}
                      <button
                        type="button"
                        onClick={() => removeCapacity(capacityValue)}
                        className="hover:text-primary/70"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">{errorMessage}</div>
          )}

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Đang xử lý..." : isEditMode ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm"}
            </Button>
            {!isEditMode && (
              <Button type="button" variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                Xóa
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
