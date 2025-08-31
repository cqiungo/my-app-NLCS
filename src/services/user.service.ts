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
  async register(data: any) {
    return (await this.api.post('/auth/register', data)).data;
  }
  async login(data: any) {
    return (await this.api.post('/auth/login', data)).data;
  }

  async getAll(token?: string) {
    return (await this.api.get('/user',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Uncomment if you need to pass a token
      }
    })).data;
  }

  async deleteAll(token?: string) {
    return (await this.api.delete('/',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      }
    })).data;
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

  async update(id: any, data: any,token?: string) {
    console.log(token);
    return (await this.api.patch(`/user/${id}`, data,{
      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Assuming token is part of data
      }
    })).data;
  }

  async delete(id: any) {
    return (await this.api.delete(`/${id}`)).data;
  }
}

export default new UserService();
