import { Cohort } from "../../types/Cohorts.types";
import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { axiosInstance } from "../../../../services/axiosConfig.service";

class CohortService {
  crud() {
    const app = new AppServices<Cohort, number>(
      `${PrivateRoutesHttp.COHORTS}`
    );
    return app;
  }

  async httpAssignUpdate(url: string) {
    try {
      // const baseUrl = this.crud().getUrl()
      await axiosInstance.put(`${PrivateRoutesHttp.COHORTS}/${url}`);
      
    } catch (error) {
      throw error;
    }
  }

  async httpAssignClassOnlive(url: string) {
    try {
      // const baseUrl = this.crud().getUrl()
      await axiosInstance.put(`${PrivateRoutesHttp.COHORTS}/assign/${url}`);
      
    } catch (error) {
      throw error;
    }
  }
}

export default new CohortService();
