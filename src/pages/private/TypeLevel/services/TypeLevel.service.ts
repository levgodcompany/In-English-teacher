import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { TypeLevelDto } from "../types/TypeLevel.types";

class TypeLevelService {
  crud() {
    const app = new AppServices<TypeLevelDto, number>(PrivateRoutesHttp.TYPE_LEVEL);
    return app;
  }
}

export default new TypeLevelService();
