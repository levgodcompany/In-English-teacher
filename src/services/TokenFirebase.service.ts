import { axiosInstance } from "./axiosConfig.service";

class TokenFirebaseService {
  async getToken(id: number) {
    const res = await axiosInstance.get<string>(`auht/${id}`);
    return res.data;
  }
}

export default new TokenFirebaseService();
