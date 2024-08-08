import { PrivateRoutesHttp } from "../../../../../../routes/routes";
import { AppServices } from "../../../../../../utilities/https.utility";
import { SuscriptionCreateDto } from "../../../types/Suscription.types";

class NewSuscriptionServices{

    crud(){
        return new AppServices<SuscriptionCreateDto, number>(PrivateRoutesHttp.SUSCRIPTION)
    }
}


export default new NewSuscriptionServices();