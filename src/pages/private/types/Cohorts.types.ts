export type Cohort = {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  idLevel: number;
};

export type CohortCreate = {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationStartDate: Date;
  registrationEndDate: Date;
  idLevel: number;
};

export type CohortAllInfo = {
  id: number;
  title: string;
  description: string;
  startDate: string; // Date can be used if you are parsing the date strings
  endDate: string; // Date can be used if you are parsing the date strings
  registrationStartDate: string; // Date can be used if you are parsing the date strings
  registrationEndDate: string; // Date can be used if you are parsing the date strings
  idLevel: number;
  cohortCourses: {
    idCourse: number;
    idCohort: number;
    courses: {
      id: number;
      description: string;
      title: string;
      idUnit: number;
    };
  }[];
  cohortModules: {
    idModule: number;
    idCohort: number;
    modules: {
      id: number;
      title: string;
      description: string;
      order: number;
    };
  }[];
  cohortStudents: {
    idStudent: number;
    idCohort: number;
    student: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
  }[];
  cohortTeachers: {
    idTeacher: number;
    idCohort: number;
    teacher: {
      id: number;
      name: string;
      lastName: string;
      email: string;
    };
  }[];
  cohortUnities: {
    idUnit: number;
    idCohort: number;
    unities: {
      id: number;
      title: string;
      description: string;
      order: number;
    };
  }[];
  level: {
    id: number;
    title: string;
    description: string;
  };
};
