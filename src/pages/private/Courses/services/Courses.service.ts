import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { AppServices } from "../../../../utilities/https.utility";
import { Course } from "../../types/Courses.types";

class CoursesServices {
  crud() {
    const app = new AppServices<Course, number>(PrivateRoutesHttp.COURSES);
    return app;
  }

  async enable(idCohort: number, idUnit: number, enabled: boolean) {
    try {
      await axiosInstance.put(
        `${PrivateRoutesHttp.COHORTS}/cohort-course/enable/cohort/${idCohort}/course/${idUnit}`,
        { enabled }
      );
    } catch (error) {}
  }
}

export default new CoursesServices();
