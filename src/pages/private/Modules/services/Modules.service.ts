import { PrivateRoutesHttp } from "../../../../routes/routes";
import { AppServices } from "../../../../utilities/https.utility";
import { Module } from "../../types/Modules.types";

class ModulesServices {
    crud() {
        const app = new AppServices<Module, number>(PrivateRoutesHttp.MODULES);
        return app;
    }
}

export default new ModulesServices()