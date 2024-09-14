export interface ClassOnliveDTO {
  id: number;
  title: string;
  url: string;
}

export interface CohortTeacherRelationshipDTO {
  idTeacher: number;
  idCohort: number;
  name: string;
  lastName: string;
  email: string;
}

export interface CohortStudentRelationshipDTO {
  idStudent: number;
  enabled: boolean;
  name: string;
  lastName: string;
  email: string;
}

export interface CohortUnitRelationshipDTO {
  idUnit: number;
  idLevel: number;
  titleLevel: string;
  enabled: boolean;
  title: string;
}

export interface CohortCourseRelationshipDTO {
  idCourse: number;
  idUnit: number;
  titleUnit: string;
  enabled: boolean;
  title: string;
}

export interface CohortModuleRelationshipDTO {
  idModule: number;
  idCourse: number;
  enabled: boolean;
  title: string;
}

export interface CohortDTO {
  id: number;
  title: string;
  cohortTeachers: CohortTeacherRelationshipDTO[];
  cohortStudents: CohortStudentRelationshipDTO[];
  cohortUnities: CohortUnitRelationshipDTO[];
  cohortCourses: CohortCourseRelationshipDTO[];
  cohortModules: CohortModuleRelationshipDTO[];
  classOnlives: ClassOnliveDTO[];
}
