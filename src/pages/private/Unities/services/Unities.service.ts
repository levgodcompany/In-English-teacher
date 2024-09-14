import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { AppServices } from "../../../../utilities/https.utility";
import { Unit } from "../types/Unities.types";

class UnitiesServices {
  crud() {
    const app = new AppServices<Unit, number>(PrivateRoutesHttp.UNITIES);
    return app;
  }

  async enable(idCohort:number, idUnit: number, enabled:boolean){
    try {
      await axiosInstance.put(`${PrivateRoutesHttp.COHORTS}/cohort-unit/enable/cohort/${idCohort}/unit/${idUnit}`, {enabled});
    } catch (error) {
      
    }
  }

}

export default new UnitiesServices();
