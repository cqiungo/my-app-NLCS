"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Eye, Star, TrendingUp, Zap, Award, Gift, ShoppingBag, Shield } from "lucide-react"

interface Product {
  id: string | number
  name: string
  price: number
  image: string
  category: string
  rating?: number
  reviews?: number
  discount?: number
  originalPrice?: number
  badge?: string
  inStock?: boolean
}

interface ProductCarouselProps {
  title?: string
  categoryId?: number
}

export default function ProductCarousel({ title = "Sản phẩm nổi bật" }: ProductCarouselProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState<Set<string | number>>(new Set())
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Mock data for demonstration
        const mockProducts: Product[] = [
          {
            id: 1,
            name: "iPhone 15 Pro Max 256GB",
            price: 29990000,
            originalPrice: 34990000,
            image: "https://images.unsplash.com/photo-1678652197950-d4f49a55d07e?w=500",
            category: "iPhone",
            rating: 4.9,
            reviews: 1250,
            discount: 15,
            badge: "Hot",
            inStock: true,
          },
          {
            id: 2,
            name: "Samsung Galaxy S24 Ultra 512GB",
            price: 27990000,
            originalPrice: 31990000,
            image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500",
            category: "Samsung",
            rating: 4.8,
            reviews: 980,
            discount: 12,
            badge: "New",
            inStock: true,
          },
          {
            id: 3,
            name: "Xiaomi 14 Pro 256GB",
            price: 18990000,
            originalPrice: 22990000,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
            category: "Xiaomi",
            rating: 4.7,
            reviews: 756,
            discount: 17,
            badge: "Sale",
            inStock: true,
          },
          {
            id: 4,
            name: "OPPO Find X7 Ultra 512GB",
            price: 24990000,
            originalPrice: 28990000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            category: "OPPO",
            rating: 4.6,
            reviews: 543,
            discount: 14,
            badge: "Hot",
            inStock: true,
          },
          {
            id: 5,
            name: "Google Pixel 8 Pro 256GB",
            price: 21990000,
            originalPrice: 25990000,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
            category: "Google",
            rating: 4.8,
            reviews: 432,
            discount: 15,
            badge: "New",
            inStock: true,
          },
          {
            id: 6,
            name: "OnePlus 12 Pro 512GB",
            price: 19990000,
            originalPrice: 23990000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            category: "OnePlus",
            rating: 4.7,
            reviews: 621,
            discount: 16,
            inStock: false,
          },
          {
            id: 7,
            name: "Vivo X100 Pro 256GB",
            price: 22990000,
            originalPrice: 26990000,
            image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500",
            category: "Vivo",
            rating: 4.6,
            reviews: 389,
            discount: 15,
            badge: "Hot",
            inStock: true,
          },
          {
            id: 8,
            name: "Realme GT 5 Pro 512GB",
            price: 14990000,
            originalPrice: 17990000,
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500",
            category: "Realme",
            rating: 4.5,
            reviews: 287,
            discount: 16,
            badge: "Sale",
            inStock: true,
          },
        ]

        setProducts(mockProducts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const toggleFavorite = (productId: string | number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId)
      } else {
        newFavorites.add(productId)
      }
      return newFavorites
    })
  }

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "Hot":
        return "bg-red-500"
      case "New":
        return "bg-green-500"
      case "Sale":
        return "bg-orange-500"
      default:
        return "bg-blue-500"
    }
  }

  const tabs = [
    { id: "all", label: "Tất Cả", icon: ShoppingBag },
    { id: "hot", label: "Bán Chạy", icon: TrendingUp },
    { id: "new", label: "Mới Nhất", icon: Zap },
    { id: "sale", label: "Khuyến Mãi", icon: Gift },
  ]

  if (loading) {
    return (
      <section className="w-full py-12 px-4 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="max-w-[1800px] mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-muted-foreground">Đang tải sản phẩm...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!products || products.length === 0) {
    return null
  }

  const filteredProducts =
    activeTab === "all"
      ? products
      : products.filter((p) => p.badge?.toLowerCase() === activeTab || (activeTab === "hot" && p.badge === "Hot"))

  return (
          <section className="w-full py-12 px-4 bg-gradient-to-b from-blue-50 to-cyan-50">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">{title}</h2>
          <p className="text-muted-foreground text-lg">Khám phá các sản phẩm hot nhất hiện nay</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className={`gap-2 ${activeTab === tab.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <Card
              key={product.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 h-full flex flex-col border-0 shadow-lg hover:scale-105"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {/* Product Image */}
              <div className="relative w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.badge && (
                    <Badge className={`${getBadgeColor(product.badge)} text-white border-0 shadow-lg`}>
                      {product.badge}
                    </Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-red-500 text-white border-0 shadow-lg">-{product.discount}%</Badge>
                  )}
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className="bg-white/90 text-foreground border-0 shadow-lg backdrop-blur">
                    {product.category}
                  </Badge>
                </div>

                {/* Quick Actions - Show on Hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white hover:bg-gray-100"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-white hover:bg-gray-100">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Stock Status */}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Badge className="bg-gray-800 text-white text-lg px-4 py-2">Hết Hàng</Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <CardContent className="p-5 flex-1 flex flex-col gap-3">
                <h3 className="font-semibold text-foreground line-clamp-2 hover:text-blue-600 transition-colors text-base leading-snug">
                  {product.name}
                </h3>

                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews} đánh giá)</span>
                  </div>
                )}

                {/* Price */}
                <div className="mt-auto space-y-1">
                  {product.originalPrice && (
                    <p className="text-sm text-muted-foreground line-through">
                      {product.originalPrice.toLocaleString("vi-VN")} ₫
                    </p>
                  )}
                  <p className="text-xl font-bold text-blue-600">{product.price.toLocaleString("vi-VN")} ₫</p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Award className="w-3 h-3 mr-1" />
                    Chính hãng
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    <Zap className="w-3 h-3 mr-1" />
                    Trả góp 0%
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700 gap-2"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Mua Ngay
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleFavorite(product.id)}
                    className={favorites.has(product.id) ? "border-red-500 text-red-500" : ""}
                  >
                    <Heart className={`w-4 h-4 ${favorites.has(product.id) ? "fill-red-500" : ""}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8 py-6 text-lg font-semibold">
            Xem Tất Cả Sản Phẩm
            <TrendingUp className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
            <Award className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-sm font-semibold">100% Chính Hãng</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
            <Shield className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-sm font-semibold">Bảo Hành 12 Tháng</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
            <Zap className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-sm font-semibold">Giao Hàng Nhanh</p>
          </div>
          <div className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm">
            <Gift className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-sm font-semibold">Quà Tặng Hấp Dẫn</p>
          </div>
        </div>
      </div>
    </section>
  )
}