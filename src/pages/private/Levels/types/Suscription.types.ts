export type SuscriptionCreateDto = {
    idLevel: number;
    title: string;
    description: string;
    amount: number;
    numInstallments: number;
    discountPercentage: number;
}