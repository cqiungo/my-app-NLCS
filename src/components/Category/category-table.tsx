"use client"
import { useEffect } from "react"
import { Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Category } from "./category-management"
import categoryService from "@/services/category.service"
interface CategoryTableProps {
  categories: Category[]
  onEdit: (category: Category) => void
  onDelete: (id: string) => void
}

export function CategoryTable({ categories, onEdit, onDelete }: CategoryTableProps) {
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll()
        // Handle the fetched categories as needed
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Tên danh mục</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Ngày tạo</th>
            <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-border hover:bg-muted/50 transition-colors">
              <td className="px-6 py-4">
                <span className="font-medium text-foreground">{category.name}</span>
              </td>

              <td className="px-6 py-4">
                <span className="text-sm text-muted-foreground">
                  {new Date(category.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(category)}
                    className="text-primary hover:bg-primary/10"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(category.id)}
                    className="text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
