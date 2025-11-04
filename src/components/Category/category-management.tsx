"use client"

import { useState,useEffect } from "react"
import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { useUser } from "@/context/UserContext"
import { CategoryForm } from "./category-form"
import { CategoryTable } from "./category-table"
import categoryService from "@/services/category.service"
import { useRouter } from "next/navigation" 
export interface Category {
  id: string
  name: string
  createdAt: string
}   

export function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([])
  const token = useUser().user?.access_token || ''
  const router = useRouter()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryService.getAll()
        const fetchedCategories = (res as any[]).map((cat: any) => ({
          id: cat.id,
          name: cat.name,
          createdAt: cat.createdAt,
        }))
        setCategories(fetchedCategories)
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCategory = (data: Omit<Category, "id" | "createdAt">) => {
    const newCategory: Category = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    }
    setCategories([...categories, newCategory])
    setIsFormOpen(false)
  }

  const handleUpdateCategory = (data: Omit<Category, "id" | "createdAt">) => {
    if (!editingCategory) return
    setCategories(categories.map((cat) => (cat.id === editingCategory.id ? { ...cat, ...data } : cat)))
    setEditingCategory(null)
    setIsFormOpen(false)
  }

  const handleDeleteCategory = async (id: string) => {
    try{
      await categoryService.delete(id,token)
      .then(() => {
        setCategories(categories.filter((cat) => cat.id !== id))
      })
    }
    catch(error){
      router.push('/auth/login')
      console.error("Error deleting category:", error)
    }
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingCategory(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Quản lý Danh mục</h1>
          <p className="text-muted-foreground">Tạo, chỉnh sửa và quản lý các danh mục sản phẩm của bạn</p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="Tìm kiếm danh mục..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            onClick={() => {
              setEditingCategory(null)
              setIsFormOpen(true)
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            <Plus className="w-5 h-5" />
            Thêm danh mục
          </Button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CategoryForm
                category={editingCategory}
                onSubmit={editingCategory ? handleUpdateCategory : handleAddCategory}
                onCancel={handleCloseForm}
              />
            </Card>
          </div>
        )}

        {/* Table */}
        <Card className="overflow-hidden">
          <CategoryTable categories={filteredCategories} onEdit={handleEdit} onDelete={handleDeleteCategory} />
        </Card>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <Card className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              {searchTerm ? "Không tìm thấy danh mục nào" : "Chưa có danh mục nào. Hãy tạo danh mục đầu tiên!"}
            </p>
            {!searchTerm && (
              <Button onClick={() => setIsFormOpen(true)} variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Tạo danh mục
              </Button>
            )}
          </Card>
        )}
      </div>
    </div>
  )
}
