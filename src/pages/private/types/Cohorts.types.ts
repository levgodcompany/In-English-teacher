export type Cohort = {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    idLevel: number;
}

export type CohortCreate = {
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    registrationStartDate: Date;
    registrationEndDate: Date;
    idLevel: number;
}