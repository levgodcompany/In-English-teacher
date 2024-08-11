import { Module } from "./Modules.types";

export type Course = {
  id: number;
  title: string;
  description: string;
  order: number;
  idUnit: number;
};

export type CourseCreate = {
  title: string;
  description: string;
  order: number;
  idUnit: number;
};

export type CourseAndModules = {
  id: number;
  title: string;
  description: string;
  order: number;
  idUnit: number;
  modules: Module[];
};

export type CourseInfoBasic = {
  id: number;
  title: string;
  idUnit: number;
};

export type CohortCourse = {
  idCourse: number;
  idCohort: number;
  cohort: {
    title: string;
    id: number;
  };
  courses: {
    id: number;
    title: string;
  };
};
