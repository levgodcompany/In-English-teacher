export type Benefit = {
  id: number;
  description: string;
};

export type PaymentMethod = {
  id: number;
  description: string;
};

export type LevelSuscription = {
  id: number;
  idLevel: number;
  title: string;
  description: string;
  amount: string;
  numInstallments: number;
  discountPercentage: number;
  benefits: Benefit[];
  paymentMethods: PaymentMethod[];
};
