export type Module = {
  id: number;
  title: string;
  description: string;
  idCourse: number;
  order: number;
  fileURL: string | null;
  typeFile: string | null;
};

export type ModuleCreate = Omit<Module, "id">;

export type ModuleInfoBasic = {
  id: number;
  title: string;
  idCourse: number;
};

export type CohortModule = {
  idModule: number;
  idCohort: number;
  cohort: {
    title: string;
    id: number;
  };
  modules: {
    id: number;
    title: string;
  };
};
