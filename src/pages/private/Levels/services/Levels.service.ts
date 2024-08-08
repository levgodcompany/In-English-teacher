import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { levelDto } from "../types/Levels.types";

class LevelsServices {
  crud() {
    const app = new AppServices<levelDto, number>(PrivateRoutesHttp.LEVELS);
    return app;
  }
}

export default new LevelsServices();
