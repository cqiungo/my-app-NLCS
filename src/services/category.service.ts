// services/user.service.ts
import createApiClient from './api.service';

class CategoryService {
  api: any;
  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`) {
    this.api = createApiClient(baseUrl);
  }


  async getAll(token?: string) {
    return (await this.api.get('/categories',{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
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

  async delete(id: any,token:string) {
    return (await this.api.delete(`/users/${id}`,{
      headers:{
        'Cotent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })).data;
  }
}

export default new CategoryService();
