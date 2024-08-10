import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { ExamLevel } from "../../types/ExamsLevels.types";

class ExamService {
  crud() {
    const app = new AppServices<ExamLevel, number>(
      `${PrivateRoutesHttp.EXAMS_LEVELS}`
    );
    return app;
  }
}

export default new ExamService();
