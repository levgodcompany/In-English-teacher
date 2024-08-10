import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { Course } from "../../types/Courses.types";

class CoursesServices {
    crud() {
        const app = new AppServices<Course, number>(PrivateRoutesHttp.COURSES);
        return app;
    }
}

export default new CoursesServices()