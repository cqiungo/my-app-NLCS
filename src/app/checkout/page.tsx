"use client"
import { useCart } from "@/context/CartContext"
import type React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle2, Lock } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useUser } from "@/context/UserContext"
import orderService from "@/services/order.service"

export default function CheckoutPage() {
  const user = useUser().user
  const { cart } = useCart()
  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    phone: user?.phone, 
    address: user?.address,
    paymentMethod: "cod",
  })
  const [orderPlaced, setOrderPlaced] = useState(false)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 500000 ? 0 : 30000
  const tax = Math.round(subtotal * 0.1)
  const total = subtotal + tax + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    await orderService.create({
      userId: Number(user?.id),
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
        color:item.color?.name,
        capacity:item.capacity?.name
      })),
      totalPrice: total,
      address: formData.address || "",
      },
      user?.access_token || ""
      )
    .then((res) => {
      console.log("Order created successfully:", res)
      setOrderPlaced(true)
    })
    .catch((err) => {
      console.error("Error creating order:", err)
    })    
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
          <p className="text-muted-foreground mb-6">Vui lòng thêm sản phẩm trước khi thanh toán</p>
          <Link href="/cart">
            <Button className="w-full">Quay lại giỏ hàng</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 rounded-full p-4">
              <CheckCircle2 className="w-16 h-16 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Đặt hàng thành công!</h2>
          <p className="text-muted-foreground mb-2">Cảm ơn bạn đã mua sắm</p>
          <p className="text-sm text-muted-foreground mb-6">
            Mã đơn hàng:{" "}
            <span className="font-mono font-bold text-foreground">#ORD{Date.now().toString().slice(-8)}</span>
          </p>
          <Link href="/">
            <Button className="w-full">Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-4">
            <ArrowLeft className="w-4 h-4" />
            Quay lại giỏ hàng
          </Link>
          <h1 className="text-4xl font-bold text-foreground">Thanh toán</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Thông tin giao hàng</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Họ và tên"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Số điện thoại"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Địa chỉ"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Phương thức thanh toán</h2>
                <div className="space-y-3">
                  <label
                    className="flex items-center p-4 border border-border rounded-lg cursor-pointer hover:bg-secondary/50 transition-colors"
                    style={{ borderColor: formData.paymentMethod === "cod" ? "var(--primary)" : "var(--border)" }}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === "cod"}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="ml-3 font-medium text-foreground">Thanh toán khi nhận hàng (COD)</span>
                  </label>

                </div>
              </div>

              {/* Order Items Preview */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Sản phẩm đặt hàng</h2>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="flex justify-between items-center pb-3 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Số lượng: {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-foreground">
                        {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-4 h-fit">
              <h2 className="text-xl font-bold text-foreground mb-6">Tóm tắt đơn hàng</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span className="font-medium text-foreground">{subtotal.toLocaleString("vi-VN")}₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Vận chuyển</span>
                  <span className="font-medium text-foreground">
                    {shipping === 0 ? "Miễn phí" : shipping.toLocaleString("vi-VN") + "₫"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Thuế (10%)</span>
                  <span className="font-medium text-foreground">{tax.toLocaleString("vi-VN")}₫</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-foreground">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary">{total.toLocaleString("vi-VN")}₫</span>
              </div>

              <Button onClick={handleSubmit} className="w-full mb-3 gap-2">
                <Lock className="w-4 h-4" />
                Đặt hàng ngay
              </Button>

              <p className="text-xs text-muted-foreground text-center">Giao dịch của bạn được bảo vệ bởi mã hóa SSL</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
