import { axiosInstance } from "../../../../services/axiosConfig.service";
import { login } from "../types/login.types";

type student = {
  id: number;
  name: string;
  lastName: string;
  email: string;
};
type response = { user: student; token: string };
class LoginService {
  async login(data: login) {
    try {
      const res = await axiosInstance.post<response>(
        `auht/teacher/login`,
        data
      );
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LoginService();
