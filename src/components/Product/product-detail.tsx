"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useCart } from "@/context/CartContext"
import { ToastContainer, toast, Bounce } from "react-toastify"
interface Product {
  id: number
  name: string
  price: number
  description: string
  quantity: number
  category: string
  image: string
  images?: Array<{ id: number; url: string }> | string[]
  colors: colorItem[]
  capacities: capacityItem[]
}
interface colorItem {
  id: number
  name: string
  hex: string // added hex color property for displaying color swatches
}
interface capacityItem {
  id: number
  name: string
}
interface ProductDetailProps {  
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [cartQuantity, setCartQuantity] = useState(1)
  const [selectColor, setSelectColor] = useState<colorItem>()
  const [selectCapacity, setSelectCapacity] = useState<capacityItem>()
  const { addToCart } = useCart()
  const mappedColors =
  product.colors?.map((color) => {
    const colorMap: Record<string, string> = {
      "đen": "#000000",
      "trắng": "#FFFFFF",
      "xanh dương": "#007BFF",
      "đỏ": "#FF0000",
      "vàng": "#FFD700",
      "tím": "#800080",
      "xanh lá": "#28A745",
    }
    const hex = colorMap[color.name.toLowerCase()] || "#CCCCCC"
    return { ...color, hex }
  }) || []

  const imageList =
    product.images && product.images.length > 0
      ? product.images.map((img: any) => (typeof img === "string" ? img : img.url))
      : [product.image]
  const currentImage = imageList[selectedImageIndex] || product.image

  const handleIncreaseQuantity = () => {
    if (cartQuantity < product.quantity) {
      setCartQuantity(cartQuantity + 1)
    }
  }

  const handleDecreaseQuantity = () => {
    if (cartQuantity > 1) {
      setCartQuantity(cartQuantity - 1)
    }
  }

  const addToCarts = () => {
  if (!selectColor || !selectCapacity) {
    toast.error("Vui lòng chọn màu sắc và dung lượng!", {
      position: "top-right",
      autoClose: 3000,
      theme: "light",
    })
    return
  }

  const variantId = `${product.id}-${selectColor.id}-${selectCapacity.id}`

  const item = {
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: cartQuantity,
    image: product.image,
    color: selectColor,
    capacity: selectCapacity,
    cartItemId: variantId, // 🔥 ổn định theo biến thể
  }

  addToCart(item)

  toast.success("Đã thêm vào giỏ hàng!", {
    position: "top-right",
    autoClose: 3000,
    theme: "light",
  })
}
  return (
    <div className="min-h-screen bg-background px-4 md:px-8">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <div className="max-w-6xl mx-auto my-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ảnh chính */}
          <div className="flex flex-col gap-4">
            <Card className="overflow-hidden bg-muted aspect-square flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </Card>

            {imageList.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {imageList.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? "border-primary" : "border-muted hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Thông tin sản phẩm */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-muted-foreground">{product.category}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{product.price.toLocaleString("vi-VN")} VNĐ</span>
              <span className="text-sm text-muted-foreground">
                {product.quantity > 0 ? `${product.quantity} có sẵn` : "Hết hàng"}
              </span>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Mô tả</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Color Selection */}
              {mappedColors.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Màu sắc: {selectColor && <span className="text-primary">{selectColor.name}</span>}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {mappedColors.map((color) => (
                      <button
                        key={color.id}
                        onClick={() => setSelectColor(color)}
                        title={color.name}
                        className={`w-10 h-10 rounded-full border-2 transition-all flex-shrink-0 ${
                          selectColor?.id === color.id
                            ? "border-primary ring-2 ring-primary ring-offset-2"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{ backgroundColor: color.hex }}
                      />
                    ))}
                  </div>
                </div>
              )}


              {/* Capacity Selection */}
              {product.capacities && product.capacities.length > 0 && (
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Dung lượng: {selectCapacity && <span className="text-primary">{selectCapacity.name}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.capacities.map((capacity) => (
                      <button
                        key={capacity.id}
                        onClick={() => setSelectCapacity(capacity)}
                        className={`px-4 py-2 rounded-lg border-2 transition-all font-medium text-sm ${
                          selectCapacity?.id === capacity.id
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background hover:border-muted-foreground"
                        }`}
                      >
                        {capacity.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">Số lượng:</span>
                <div className="flex items-center border border-muted-foreground rounded-lg">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={cartQuantity <= 1}
                    className="px-3 py-2 text-lg font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4">{cartQuantity}</span>
                  <button
                    onClick={handleIncreaseQuantity}
                    disabled={cartQuantity >= product.quantity}
                    className="px-3 py-2 text-lg font-semibold hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <Button onClick={addToCarts} size="lg" disabled={product.quantity <= 0} className="w-full">
                Thêm vào giỏ hàng ({cartQuantity})
              </Button>
            </div>

            {imageList.length > 1 && (
              <div className="text-sm text-muted-foreground">Có {imageList.length} hình ảnh sản phẩm</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
