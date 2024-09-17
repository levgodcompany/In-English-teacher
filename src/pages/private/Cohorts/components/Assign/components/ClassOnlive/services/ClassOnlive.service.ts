import { PrivateRoutesHttp } from "../../../../../../../../routes/routes";
import { AppServices } from "../../../../../../../../utilities/https.utility";
import { ClassOnliveCreateDto } from "../types/ClassOnlive.type";

class ClassOnliveService {
  crud() {
    const app = new AppServices<ClassOnliveCreateDto, number>(
      `${PrivateRoutesHttp.CLASS_ONLIVE}`
    );
    return app;
  }
}

export default new ClassOnliveService();
