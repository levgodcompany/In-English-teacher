import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { Student } from "../../types/Students.types";

class StudentsServices {
  crud() {
    const app = new AppServices<Student, number>(PrivateRoutesHttp.STUDENTS);
    return app;
  }
}

export default new StudentsServices();
