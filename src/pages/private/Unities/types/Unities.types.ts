export type Unit = {
    id: number;
    title: string;
    description: string;
    order: number;
    idLevel: number;
}

export type UnitCreate = {
    title: string;
    description: string;
    order: number;
    idLevel: number;
}