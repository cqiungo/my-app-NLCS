// services/product.service.ts
import createApiClient from './api.service';

class ProductService {
  api: any;

  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/product`) {
    this.api = createApiClient(baseUrl);
  }

  // 🟢 Tạo sản phẩm mới
  async create(data: any, token?: string) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("categoryId", data.categoryId);
  formData.append("colorIds",data.color)
  formData.append("capacityIds",data.capacity)

  // ✅ Append tất cả ảnh
  if (data.images && data.images.length > 0) {
    data.images.forEach((image: File) => {
      if (image instanceof File) {
        formData.append("files", image);
      }
    });
  }

  return (
    await this.api.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

  // 🟢 Cập nhật sản phẩm (sửa)
  async update(id: any, data: any, token?: string) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("quantity", data.quantity);
  formData.append("categoryId", data.categoryId);
  formData.append("colorIds",data.color)
  formData.append("capacityIds",data.capacity)
  if (data.images && data.images.length > 0) {  
    data.images.forEach((image: File) => {
      if (image instanceof File) {
        formData.append("files", image);
      }
    });
  }

  return (
    await this.api.patch(`/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
