"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { Category } from "./category-management"
import categoryService from "@/services/category.service"
import { useUser } from "@/context/UserContext"

interface CategoryFormProps {
  category?: Category | null
  onSubmit: (data: Omit<Category, "id" | "createdAt">) => void
  onCancel: () => void
}

export function CategoryForm({ category, onSubmit, onCancel }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
  })
  const token = useUser().user?.access_token || ""
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Tên danh mục là bắt buộc"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      setIsLoading(true)
      try {
        if (category) {
          await categoryService.update(category.id, formData, token)
        } else {
          await categoryService.create(formData, token)
        }
        onSubmit(formData)
      } catch (error) {
        console.error("Error saving category:", error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">{category ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}</h2>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Tên danh mục</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Nhập tên danh mục"
          className={errors.name ? "border-destructive" : ""}
          disabled={isLoading}
        />
        {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"></span>
              {category ? "Đang cập nhật..." : "Đang tạo..."}
            </span>
          ) : category ? (
            "Cập nhật"
          ) : (
            "Tạo"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 bg-transparent"
          disabled={isLoading}
        >
          Hủy
        </Button>
      </div>
    </form>
  )
}
