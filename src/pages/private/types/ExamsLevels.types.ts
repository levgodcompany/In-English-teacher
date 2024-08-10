export type ExamLevel = {
    id: number;
    idLevel: number;
    idTeacher: number;
    title: string;
    description: string;
    archive: string;
    passingScore: number;
    NumberAttempts: number;
}

export type ExamLevelCreate = {
    idLevel: number;
    idTeacher: number;
    title: string;
    description: string;
    archive: string;
    passingScore: number;
    NumberAttempts: number;
}

export type ExamWithDetails = {
    id: number;
    idLevel: number;
    idTeacher: number;
    title: string;
    description: string;
    archive: string;
    passingScore: number;
    NumberAttempts: number;
    teacher: {
        name: string;
        lastName: string;
    };
    level: {
        title: string;
    };
};
