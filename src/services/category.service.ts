// services/category.service.ts
import createApiClient from "./api.service";

class CategoryService {
  api: any;
  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`) {
    this.api = createApiClient(baseUrl);
  }

  async create(data: any, token?: string) {
    return (
      await this.api.post("/categories", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  async getAll(token?: string) {
    return (
      await this.api.get("/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  async deleteAll(token?: string) {
    return (
      await this.api.delete("/categories", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  async getByPage(page: number) {
    return (
      await this.api.get("/categories/by/pages", {
        params: { page },
      })
    ).data;
  }

  async get(id: string) {
    return (await this.api.get(`/categories/${id}`)).data;
  }

  async update(id: string, data: any, token?: string) {
    return (
      await this.api.put(`/categories/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }

  async delete(id: string, token?: string) {
    return (
      await this.api.delete(`/categories/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
    ).data;
  }
}

export default new CategoryService();
