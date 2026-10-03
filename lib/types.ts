export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  receipt?: string;
  status: "pending" | "categorized" | "reviewed";
}

export interface Category {
  name: string;
  color: string;
  icon: string;
  budget: number;
  spent: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  profit: number;
}

export interface Receipt {
  id: string;
  date: string;
  merchant: string;
  amount: number;
  category: string;
  status: "processing" | "categorized" | "needs_review";
  imageUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  plan: "free" | "starter" | "professional" | "enterprise";
  avatar?: string;
}

export interface DashboardStats {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  pendingReceipts: number;
  categorizedThisMonth: number;
  monthlyGrowth: number;
}
