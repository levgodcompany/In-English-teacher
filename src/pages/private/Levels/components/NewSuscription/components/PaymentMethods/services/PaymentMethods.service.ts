import { PrivateRoutesHttp } from "../../../../../../../../routes/routes";
import { AppServices } from "../../../../../../../../utilities/https.utility";
import { PaymentMethod } from "../../../../../types/PaymentMethods.types";

class PaymentMethodsService {

    crud() {
        const app = new AppServices<PaymentMethod, number>(PrivateRoutesHttp.PAYMENTMETHOD);
        return app;
      }
}

export default new PaymentMethodsService();