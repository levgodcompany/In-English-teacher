import { axiosInstance } from "../../../../services/axiosConfig.service";
import { levelCreateDto, levelDto } from "../types/Levels.types";

class LevelsServices {
  private levels = "levels";
  private api = axiosInstance;

  constructor() {
    this.api = axiosInstance;
  }

  async getAllLevles() {
    try {
      const response = await this.api.get<levelDto[]>(`${this.levels}/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createLevel(data: levelCreateDto) {
    try {
      const response = await this.api.post<levelDto>(`${this.levels}/`, data);

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new LevelsServices();
