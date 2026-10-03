export interface User {
  id: string;
  email: string;
  name: string;
  businessName: string;
  plan: 'starter' | 'professional' | 'enterprise';
  createdAt: string;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  date: string;
  receiptId?: string | null;
  createdAt: string;
}

export interface Receipt {
  id: string;
  userId: string;
  merchant: string;
  amount: number;
  date: string;
  category: string;
  imageUrl: string;
  ocrText: string;
  status: 'processed' | 'pending' | 'error';
  createdAt: string;
}

export interface Category {
  id: string;
  userId: string;
  name: string;
  type: 'income' | 'expense';
  color: string;
  createdAt: string;
}

export interface Report {
  totalIncome: number;
  totalExpenses: number;
  netProfit: number;
  transactionCount: number;
  topCategories: { name: string; amount: number }[];
  monthlyData: { month: string; income: number; expenses: number }[];
}
