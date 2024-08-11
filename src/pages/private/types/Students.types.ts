export type Student = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  idStatus: number;
};

type Level = {
  levelId: number;
  studentId: number;
  level: {
    title: string;
    id: number;
  };
};

export type StudentAndLevels = {
  id: number;
  name: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: string; // Puede ser Date si prefieres manejarlo como un objeto Date en lugar de un string
  idStatus: number;
  levels: Level[];
};

export type StudentInfoBasic = {
  id: number;
  fullName: string;
};
