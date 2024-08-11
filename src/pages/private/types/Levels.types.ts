export type levelDto = {
    id: number;
    title: string;
    description: string;
    order: number
}

export type levelCreateDto = {
    title: string;
    description: string;
    order: number
}

export type LevelInfoBasic = {
    id: number;
    title: string;
}