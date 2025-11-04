"use client"

import { useEffect, useState } from "react"
import orderService from "@/services/order.service"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/context/UserContext"
import { Header } from "@/components/header-client"
import { useRouter } from "next/navigation"
interface OrderItem {
  product: {
    name: string
    imageUrl: string
  }
}

interface Order {
  id: number
  totalPrice: number
  status: string
  createdAt: string
  orderItems: OrderItem[]
}

export default function OrdersPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const user = useUser().user   
  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.access_token || !user?.id) return
      try {
        const res = await orderService.getByUser(user.id, session.access_token)
        setOrders(res)
      } catch (err) {
        router.push('/auth/login')
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchOrders()
  }, [session])

  if (loading)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
    )

  return (
    <>
    <Header/>
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">📦 Danh Sách Đơn Hàng</h1>

      {orders.length === 0 && (
        <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => {
          const firstProduct = order.orderItems[0]?.product
          const productImage = firstProduct?.imageUrl || "/no-image.png"

          return (
            <Card key={order.id} className="hover:shadow-lg transition">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <img
                  src={productImage}
                  alt={firstProduct?.name || "Product"}
                  className="w-32 h-32 object-cover rounded-lg mb-4"
                />
                <h2 className="font-semibold">Đơn hàng #{order.id}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                </p>
                <p className="mt-2 text-lg font-bold text-blue-600">
                  {order.totalPrice.toLocaleString("vi-VN")}₫
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${
                    order.status === "PAID"
                      ? "text-green-600"
                      : order.status === "PENDING"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  {order.status}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
    </>
  )
}
