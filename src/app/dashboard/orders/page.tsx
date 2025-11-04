"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import orderService from "@/services/order.service"
import Image from "next/image"
import { useUser } from "@/context/UserContext"
import { useRouter } from "next/navigation"
import { Trash2, Package, UserIcon, Calendar, DollarSign } from "lucide-react"
interface Product {
  id: number
  name: string
  imageUrl?: string
}

interface OrderItem {
  id: number
  quantity: number
  price: number
  product: Product
  color:string,
  capacity:string
}

interface OrderUser {
  id: number
  name: string
  email: string
}

interface Order {
  id: number
  user: OrderUser
  orderItems: OrderItem[]
  totalPrice: number
  createdAt: string
  status: string
}

const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "pending":
      return "bg-yellow-100 text-yellow-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useUser()
  const token = user?.access_token || ""
  const router = useRouter()

  const fetchOrders = async (token: string) => {
    try {
      setIsLoading(true)
      const res = await orderService.getAll(token)
      console.log("Danh sách đơn hàng:", res)
      setOrders(res)
    } catch (error: any) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error)
      if (error?.status === 401) router.push("/auth/login")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Bạn có chắc muốn xóa đơn hàng này?")) return
    try {
      await orderService.delete(id, token)
      setOrders((prev) => prev.filter((o) => o.id !== id))
    } catch (error: any) {
      console.error("Lỗi khi xóa đơn hàng:", error)
      if (error?.status === 401) router.push("/auth/login")
    }
  }

  useEffect(() => {
    if (token){
       fetchOrders(token)
    }else{
      router.push('/auth/login')
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header Section */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">Quản lý đơn hàng</h1>
              <p className="text-slate-600 dark:text-slate-400">Tổng cộng {orders.length} đơn hàng</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{orders.length}</div>
              <p className="text-slate-600 dark:text-slate-400 text-sm">Đơn hàng</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-9xl mx-auto px-10 py-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : orders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                        Đơn hàng #{order.id}
                      </span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {order.status || "Chưa xác định"}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="px-6 py-4 space-y-4">
                  {/* Customer Info */}
                  <div className="flex items-start gap-3 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <UserIcon className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide">Khách hàng</p>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {order.user?.name || "Không xác định"}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{order.user?.email}</p>
                    </div>
                  </div>

                  {/* Products */}
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3">
                      Sản phẩm ({order.orderItems?.length || 0})
                    </p>
                    <div className="space-y-3">
                      {order.orderItems?.length > 0 ? (
                        order.orderItems.map((item) => (
                          <div
    key={item.id}
    className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700 rounded-xl hover:shadow-md transition"
  >
    <Image
      src={item.product?.imageUrl || "/placeholder.svg?height=60&width=60&query=product"}
      alt={item.product?.name}
      width={70}
      height={70}
      className="rounded-lg object-cover border border-slate-200 dark:border-slate-600"
    />
    <div className="flex-1 min-w-0 space-y-1">
      <p className="font-semibold text-slate-900 dark:text-white">{item.product?.name}</p>

      <div className="flex flex-wrap items-center gap-x-4 text-sm text-slate-600 dark:text-slate-400">
        {item.color && (
          <span className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full border border-slate-300 dark:border-slate-500"
              style={{ backgroundColor: item.color }}
            ></span>
            <span>{item.color}</span>
          </span>
        )}
        {item.capacity && (
          <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-600 rounded-md text-xs">
            {item.capacity}
          </span>
        )}
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-400">
        SL: {item.quantity} × {(item.price || 0).toLocaleString()}₫
      </p>
    </div>
  </div>
                        ))
                      ) : (
                        <p className="text-slate-400 italic text-sm">Không có sản phẩm</p>
                      )}
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Ngày tạo</p>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">
                          {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Tổng tiền</p>
                        <p className="font-bold text-green-600 dark:text-green-400 text-sm">
                          {order.totalPrice.toLocaleString()}₫
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700 border-t border-slate-200 dark:border-slate-700 flex justify-end">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(order.id)}
                    className="flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <Package className="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Không có đơn hàng nào</h3>
            <p className="text-slate-600 dark:text-slate-400">Hiện tại chưa có đơn hàng nào trong hệ thống</p>
          </div>
        )}
      </div>
    </div>
  )
}
