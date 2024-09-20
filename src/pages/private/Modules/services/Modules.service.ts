import { PrivateRoutesHttp } from "../../../../routes/routes";
import { axiosInstance } from "../../../../services/axiosConfig.service";
import { AppServices } from "../../../../utilities/https.utility";
import { Module } from "../../types/Modules.types";

class ModulesServices {
  crud() {
    const app = new AppServices<Module, number>(PrivateRoutesHttp.MODULES);
    return app;
  }

  async getToken(idTeaher: number) {
    console.log("id", idTeaher)
    const res = await axiosInstance.get<string>(`auht/${idTeaher}`);
    console.log(res.data)
    return res.data;
  }
}

export default new ModulesServices();
