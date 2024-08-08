import { PrivateRoutesHttp } from "../../../../../../../../routes/routes";
import { AppServices } from "../../../../../../../../utilities/https.utility";
import { Benefit } from "../../../../../types/Benefits.types";

class BenefitsServices {

    crud() {
        const app = new AppServices<Benefit, number>(PrivateRoutesHttp.BENEFITS);
        return app;
      }


}

export default new BenefitsServices();