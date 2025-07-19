// services/api.service.ts

import axios from 'axios';

function createApiClient(baseUrl: string) {
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return instance;
}

// 👇 EXPORT ĐÚNG KIỂU NÀY
export default createApiClient;
