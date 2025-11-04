import createApiClient from "./api.service";

class CapacityService {
  api: any
    constructor(baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`) {
        this.api = createApiClient(baseUrl);
    }
    async getAll(){
        return (await this.api.get("/capacities")).data;
    }
}
export default new CapacityService();