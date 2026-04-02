export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  status: "cleared" | "pending";
};

export type Budget = {
  id: string;
  name: string;
  spent: number;
  limit: number;
};

export type Goal = {
  id: string;
  title: string;
  current: number;
  target: number;
  eta: string;
};
