import createApiClient from "./api.service";

class ColorService {
  api: any
    constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`) {
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/colors")).data;
    }
}
export default new ColorService();