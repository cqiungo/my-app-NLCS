// services/user.service.ts
import createApiClient from './api.service';

class UserService {
  api: any;
  constructor(baseUrl='http://localhost:3001/api/v1') {
    console.log(baseUrl)
    this.api = createApiClient(baseUrl);
  }

  async create(data: any) {
    return (await this.api.post('/', data)).data;
  }

  async login(data: any) {
    return (await this.api.post('/auth/login', data)).data;
  }

  async getAll() {
    return (await this.api.get('/')).data;
  }

  async deleteAll() {
    return (await this.api.delete('/')).data;
  }

  async getByPage(page: any) {
    return (
      await this.api.get('/by/pages', {
        params: { page },
      })
    ).data;
  }

  async get(id: any) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id: any, data: any) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id: any) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new UserService();
