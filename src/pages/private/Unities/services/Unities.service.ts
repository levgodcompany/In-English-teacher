import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { Unit } from "../types/Unities.types";

class UnitiesServices {
    crud() {
        const app = new AppServices<Unit, number>(PrivateRoutesHttp.UNITIES);
        return app;
    }
}

export default new UnitiesServices();