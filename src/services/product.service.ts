// services/product.service.ts
import createApiClient from './api.service';

class ProductService {
  api: any;

  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/product`) {
    this.api = createApiClient(baseUrl);
  }

  // 🟢 Tạo sản phẩm mới
  async create(data: any, token?: string) {
    return (
      await this.api.post('/', data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  // 🟢 Lấy tất cả sản phẩm
  async getAll(token?: string) {
    return (
      await this.api.get('/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  // 🟢 Lấy sản phẩm theo ID
  async get(id: any) {
    return (await this.api.get(`/${id}`)).data;
  }

  // 🟢 Lấy sản phẩm theo trang (phân trang)
  async getByPage(page: number, limit: number = 10) {
    return (
      await this.api.get('/by/pages', {
        params: { page, limit },
      })
    ).data;
  }

  // 🟢 Cập nhật sản phẩm
  async update(id: any, data: any, token?: string) {
    return (
      await this.api.patch(`/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  // 🟢 Xóa sản phẩm theo ID
  async delete(id: any, token?: string) {
    return (
      await this.api.delete(`/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  // 🟢 Xóa tất cả sản phẩm
  async deleteAll(token?: string) {
    return (
      await this.api.delete('/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }
}

export default new ProductService();
