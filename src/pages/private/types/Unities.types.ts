export type Unit = {
  id: number;
  title: string;
  description: string;
  order: number;
  idLevel: number;
};

export type UnitCreate = {
  title: string;
  description: string;
  order: number;
  idLevel: number;
};

export type UnitInfoBasic = {
  id: number;
  title: string;
};

export type CohortAndUnit = {
  idUnit: number;
  idCohort: number;
  cohort: {
    title: string;
    id: number;
  };
  unities: {
    id: number;
    title: string;
  };
};