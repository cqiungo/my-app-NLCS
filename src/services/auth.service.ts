import crreateApiClient from './api.service'

class AuthService { 
  api: any;
  constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth`) {
    this.api = crreateApiClient(baseUrl);
  }
  async register(data:any){
    return (await this.api.post('/register', data)).data;
  }
}