import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { AppServices } from "../../../../utilities/https.utility";
import { Student } from "../../types/Students.types";

class StudentsServices {
  crud() {
    const app = new AppServices<Student, number>(PrivateRoutesHttp.STUDENTS);
    return app;
  }

  async active(idStudent: number, idStatus: string) {
    try {
      const res = await axiosInstance.put(`${PrivateRoutesHttp.STUDENTS}/active/${idStudent}/${idStatus}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new StudentsServices();
