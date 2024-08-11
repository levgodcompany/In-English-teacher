import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { Teacher } from "../../types/Teachers.types";

class TeachersServices {
  crud() {
    const app = new AppServices<Teacher, number>(
      `${PrivateRoutesHttp.TEACHERS}`
    );
    return app;
  }
}

export default new TeachersServices();
