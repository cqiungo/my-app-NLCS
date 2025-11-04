"use client"
import { useCart } from "@/context/CartContext"
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header-client"
import { useRouter } from "next/navigation"
import { useUser } from "@/context/UserContext"
import { useSession } from "next-auth/react"

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart()
  const { data: session, status } = useSession();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = Math.round(subtotal * 0.1)
  const router = useRouter()
  const total = subtotal + tax
  const user = useUser().user
  if (cart.length === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-background to-secondary flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="mb-6 flex justify-center">
              <div className="bg-muted rounded-full p-4">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Giỏ hàng trống</h2>
            <p className="text-muted-foreground mb-6">Hãy thêm một số sản phẩm để bắt đầu mua sắm</p>
            <Button className="w-full">
              <Link href="/" className="w-full block">
                Tiếp tục mua sắm
              </Link>
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Giỏ hàng của bạn</h1>
            <p className="text-muted-foreground">{cart.length} sản phẩm</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-card border border-border rounded-xl p-5 md:p-6 hover:shadow-lg transition-shadow overflow-hidden"
                  >
                    <div className="flex flex-col md:flex-row gap-5">
                      {/* Product Image */}
                      <div className="flex-shrink-0 w-full md:w-32 h-32 rounded-lg overflow-hidden bg-muted">
                        <img
                          src={`${item.image}`}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-3">{item.name}</h3>

                          {/* Color and Capacity Badges */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {item.color && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-lg border border-border/50">
                                <div
                                  className="w-3 h-3 rounded-full border border-border"
                                  style={{
                                    backgroundColor:
                                      item.color.name?.toLowerCase() === "white"
                                        ? "#fff"
                                        : item.color.name?.toLowerCase() === "black"
                                          ? "#000"
                                          : item.color.name?.toLowerCase() === "red"
                                            ? "#ef4444"
                                            : item.color.name?.toLowerCase() === "blue"
                                              ? "#3b82f6"
                                              : item.color.name?.toLowerCase() === "green"
                                                ? "#22c55e"
                                                : item.color.name?.toLowerCase() === "gold"
                                                  ? "#fbbf24"
                                                  : item.color.name?.toLowerCase() === "silver"
                                                    ? "#d1d5db"
                                                    : "#6b7280",
                                  }}
                                />
                                <span className="text-sm font-medium text-foreground">{item.color.name}</span>
                              </div>
                            )}
                            {item.capacity && (
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800/50">
                                <span className="text-sm font-medium text-blue-900 dark:text-blue-300">
                                  {item.capacity.name}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Quantity */}
                          <p className="text-sm text-muted-foreground">
                            Số lượng: <span className="font-semibold text-foreground">{item.quantity}</span>
                          </p>
                        </div>

                        {/* Price Info */}
                        <div className="flex items-end justify-between pt-4">
                          <div>
                            <p className="text-xs text-muted-foreground mb-1">Đơn giá</p>
                            <p className="text-sm text-muted-foreground">{item.price.toLocaleString("vi-VN")}₫</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground mb-1">Tổng</p>
                            <p className="text-2xl font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="flex-shrink-0 p-2.5 hover:bg-destructive/10 rounded-lg transition-colors text-destructive md:self-start"
                        aria-label="Xóa sản phẩm"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-4 h-fit shadow-lg">
                <h2 className="text-xl font-bold text-foreground mb-6">Tóm tắt đơn hàng</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tạm tính</span>
                    <span className="font-medium text-foreground">{subtotal.toLocaleString("vi-VN")}₫</span>
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

                <Button
                  onClick={() => {
                    if (!session) {
                      router.push("/auth/login")
                    } else {
                      router.push("/checkout")
                    }
                  }}
                  className="w-full mb-3 gap-2"
                >
                  Xác nhận và thanh toán
                  <ArrowRight className="w-4 h-4" />
                </Button>

                <button
                  onClick={clearCart}
                  className="w-full px-4 py-2 border border-destructive text-destructive rounded-lg hover:bg-destructive/5 transition-colors font-medium"
                >
                  Xóa toàn bộ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
