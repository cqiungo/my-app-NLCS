import createApiClient from "./api.service"

class OrderService {
  api: any

  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/orders`) {
    this.api = createApiClient(baseUrl)
  }

  // 🧾 Lấy toàn bộ đơn hàng
  async getAll(token: string) {
    return (
      await this.api.get("/", {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // 🔍 Lấy thông tin 1 đơn hàng theo ID
  async getById(id: string | number, token: string) {
    return (
      await this.api.get(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // 🛒 Tạo mới đơn hàng
  async create(data: any, token: string) {
    return (
      await this.api.post("/", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // ✏️ Cập nhật đơn hàng
  async update(id: string | number, data: any, token: string) {
    return (
      await this.api.patch(`/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // ❌ Xóa đơn hàng
  async delete(id: string | number, token: string) {
    return (
      await this.api.delete(`/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // 📦 Lấy danh sách đơn hàng theo user
  async getByUser(userId: string | number, token: string) {
    return (
      await this.api.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }

  // 💳 Thanh toán đơn hàng
  async checkout(orderId: string | number, paymentData: any, token: string) {
    return (
      await this.api.post(`/${orderId}/checkout`, paymentData, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data
  }
}

const orderService = new OrderService()
export default orderService
