"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Heart, Search, X, ChevronLeft, ChevronRight, Star, TrendingUp } from "lucide-react"
import productService from "@/services/product.service"
import { useRouter } from "next/navigation"

export default function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const data = await productService.getAll()
        const newProducts = data.map((prod: any) => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          category: prod.category.name,
          categoryId: prod.category.id,
          price: prod.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
          image: prod.imageUrl,
        }))
        setProducts(newProducts)
        setFilteredProducts(newProducts)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredProducts(filtered)
    setCurrentPage(1)
  }, [searchQuery, products])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProducts = filteredProducts.slice(startIndex, endIndex)

  return (
    <section className="py-8 bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-50 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header với gradient */}
        <div className="mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white shadow-xl">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp size={32} />
            <h1 className="text-4xl font-bold">Điện thoại nổi bật</h1>
          </div>
          <p className="text-blue-50 text-lg">Khám phá bộ sưu tập điện thoại mới nhất của chúng tôi</p>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="text-3xl font-bold">{products.length}+</p>
              <p className="text-sm text-blue-50">Sản phẩm</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="text-3xl font-bold">⭐ 4.8</p>
              <p className="text-sm text-blue-50">Đánh giá</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 border border-white/30">
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-blue-50">Hỗ trợ</p>
            </div>
          </div>
        </div>

        {/* Search section với style mới */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 mb-6 shadow-lg">
          <div className="flex flex-col gap-4">
            {/* Search input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400" size={22} />
              <Input
                placeholder="Tìm kiếm theo tên hoặc mô tả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg border-2 border-blue-100 focus:border-blue-400 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-between">
              {/* Results count */}
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
                  {filteredProducts.length} sản phẩm
                </div>
                {searchQuery && (
                  <Badge variant="secondary" className="text-sm">
                    Đang lọc
                  </Badge>
                )}
              </div>

              {searchQuery && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="gap-2 border-2 border-blue-200 hover:bg-blue-50"
                >
                  <X size={16} />
                  Xóa tìm kiếm
                </Button>
              )}
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600 mb-4"></div>
              <p className="text-blue-700 font-medium">Đang tải sản phẩm...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-200">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-xl text-gray-700 mb-4 font-semibold">Không tìm thấy sản phẩm</p>
              <p className="text-gray-500 mb-6">Hãy thử tìm kiếm với từ khóa khác</p>
              <Button 
                onClick={() => setSearchQuery("")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Xóa tìm kiếm
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {currentProducts.map((product) => (
                <Card
                  onClick={() => router.push(`/${product.id}`)}
                  key={product.id}
                  className="hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 border-2 border-blue-100 hover:border-blue-300 bg-white"
                >
                  <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-cyan-50 h-56">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(product.id)
                      }}
                      className="absolute top-3 right-3 p-2.5 bg-white rounded-full shadow-lg hover:bg-red-50 transition-all hover:scale-110"
                    >
                      <Heart
                        size={20}
                        className={favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-400"}
                      />
                    </button>

                    {/* New badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-0 shadow-lg">
                        Mới
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3 bg-gradient-to-b from-blue-50/50 to-white">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">{product.name}</h4>
                        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                      </div>
                    </div>
                    
                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(4.8)</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 bg-white">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 border border-blue-200">
                        {product.category}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-xl border border-blue-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Giá bán</p>
                        <span className="text-xl font-bold text-blue-600">{product.price}</span>
                      </div>
                      <Button
                        size="sm"
                        className="gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all"
                        onClick={(e) => {
                          e.stopPropagation()
                        }}
                      >
                        <ShoppingCart size={18} />
                        Mua
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8 bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-100">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="gap-2 border-2 border-blue-200 hover:bg-blue-50 disabled:opacity-50"
                >
                  <ChevronLeft size={18} />
                  Trước
                </Button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-10 ${
                        currentPage === page
                          ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 shadow-lg"
                          : "border-2 border-blue-200 hover:bg-blue-50"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="gap-2 border-2 border-blue-200 hover:bg-blue-50 disabled:opacity-50"
                >
                  Sau
                  <ChevronRight size={18} />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}