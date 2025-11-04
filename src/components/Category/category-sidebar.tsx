"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface Category {
  id: string
  name: string
  icon: string
  subcategories?: string[]
}

const categories: Category[] = [
  {
    id: "phones",
    name: "Điện thoại",
    icon: "📱",
    subcategories: ["iPhone", "Samsung", "Xiaomi", "Oppo"],
  },
  {
    id: "laptops",
    name: "Laptop",
    icon: "💻",
    subcategories: ["Dell", "HP", "MacBook", "ASUS"],
  },
  {
    id: "accessories",
    name: "Phụ kiện",
    icon: "🎧",
    subcategories: ["Tai nghe", "Cáp sạc", "Pin dự phòng", "Bao da"],
  },
  {
    id: "tablets",
    name: "Máy tính bảng",
    icon: "📲",
    subcategories: ["iPad", "Samsung Tab", "Lenovo"],
  },
  {
    id: "smartwatch",
    name: "Đồng hồ thông minh",
    icon: "⌚",
    subcategories: ["Apple Watch", "Samsung Watch", "Xiaomi Mi"],
  },
  {
    id: "cameras",
    name: "Camera",
    icon: "📷",
    subcategories: ["DSLR", "Mirrorless", "Action Camera"],
  },
]

export function CategorySidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId)
  }

  return (
    <aside className="hidden lg:block w-64 bg-gradient-to-b from-teal-50 to-teal-50 border-r border-teal-200 h-screen sticky top-0">
      {/* Header */}
      <div className="p-6 border-b border-teal-200">
        <h2 className="text-2xl font-bold text-teal-900">Danh mục</h2>
        <p className="text-sm text-teal-600 mt-1">Khám phá sản phẩm</p>
      </div>

      {/* Categories List */}
      <nav className="p-4 space-y-2">
        {categories.map((category) => (
          <div key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 hover:bg-teal-100 group"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-xl">{category.icon}</span>
                <span className="font-medium text-teal-900 group-hover:text-teal-700">{category.name}</span>
              </div>
              {category.subcategories && (
                <ChevronDown
                  size={18}
                  className={`text-teal-600 transition-transform duration-200 ${
                    expandedCategory === category.id ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Subcategories */}
            {expandedCategory === category.id && category.subcategories && (
              <div className="mt-1 ml-4 space-y-1">
                {category.subcategories.map((subcategory) => (
                  <a
                    key={subcategory}
                    href="#"
                    className="block px-4 py-2 rounded-md text-sm text-teal-700 hover:bg-teal-100 hover:text-teal-900 transition-colors"
                  >
                    {subcategory}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Filter Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white to-transparent border-t border-teal-200">
        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200">
          Xem tất cả sản phẩm
        </button>
      </div>
    </aside>
  )
}
