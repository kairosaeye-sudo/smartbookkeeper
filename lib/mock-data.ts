import { Transaction, Category, MonthlyData, Receipt, DashboardStats } from "./types";

export const mockTransactions: Transaction[] = [
  { id: "1", date: "2026-09-15", description: "Client Payment — ABC Corp", amount: 5000, category: "Revenue", type: "income", status: "reviewed" },
  { id: "2", date: "2026-09-14", description: "Office Supplies — Staples", amount: 234.50, category: "Office Supplies", type: "expense", status: "categorized" },
  { id: "3", date: "2026-09-13", description: "Software Subscription — Adobe", amount: 54.99, category: "Software", type: "expense", status: "categorized" },
  { id: "4", date: "2026-09-12", description: "Client Payment — XYZ Inc", amount: 3200, category: "Revenue", type: "income", status: "reviewed" },
  { id: "5", date: "2026-09-11", description: "Utilities — Electric", amount: 189.00, category: "Utilities", type: "expense", status: "categorized" },
  { id: "6", date: "2026-09-10", description: "Marketing — Google Ads", amount: 450.00, category: "Marketing", type: "expense", status: "categorized" },
  { id: "7", date: "2026-09-09", description: "Client Payment — DEF LLC", amount: 7800, category: "Revenue", type: "income", status: "reviewed" },
  { id: "8", date: "2026-09-08", description: "Travel — Flight to NYC", amount: 420.00, category: "Travel", type: "expense", status: "pending" },
  { id: "9", date: "2026-09-07", description: "Meals — Client Dinner", amount: 125.00, category: "Meals", type: "expense", status: "categorized" },
  { id: "10", date: "2026-09-06", description: "Insurance — Business Policy", amount: 350.00, category: "Insurance", type: "expense", status: "categorized" },
  { id: "11", date: "2026-09-05", description: "Client Payment — GHI Co", amount: 4100, category: "Revenue", type: "income", status: "reviewed" },
  { id: "12", date: "2026-09-04", description: "Rent — Office Space", amount: 1200.00, category: "Rent", type: "expense", status: "categorized" },
  { id: "13", date: "2026-09-03", description: "Equipment — New Laptop", amount: 1299.00, category: "Equipment", type: "expense", status: "reviewed" },
  { id: "14", date: "2026-09-02", description: "Client Payment — JKL Corp", amount: 6500, category: "Revenue", type: "income", status: "reviewed" },
  { id: "15", date: "2026-09-01", description: "Professional Services — Legal", amount: 800.00, category: "Professional Services", type: "expense", status: "categorized" },
];

export const mockCategories: Category[] = [
  { name: "Revenue", color: "#22c55e", icon: "💰", budget: 0, spent: 26600 },
  { name: "Office Supplies", color: "#3b82f6", icon: "📎", budget: 500, spent: 234.50 },
  { name: "Software", color: "#8b5cf6", icon: "💻", budget: 200, spent: 54.99 },
  { name: "Utilities", color: "#f59e0b", icon: "⚡", budget: 300, spent: 189.00 },
  { name: "Marketing", color: "#ec4899", icon: "📢", budget: 1000, spent: 450.00 },
  { name: "Travel", color: "#06b6d4", icon: "✈️", budget: 800, spent: 420.00 },
  { name: "Meals", color: "#f97316", icon: "🍽️", budget: 300, spent: 125.00 },
  { name: "Insurance", color: "#64748b", icon: "🛡️", budget: 500, spent: 350.00 },
  { name: "Rent", color: "#1e293b", icon: "🏢", budget: 1500, spent: 1200.00 },
  { name: "Equipment", color: "#78716c", icon: "🖥️", budget: 2000, spent: 1299.00 },
  { name: "Professional Services", color: "#0f766e", icon: "⚖️", budget: 1000, spent: 800.00 },
];

export const mockMonthlyData: MonthlyData[] = [
  { month: "Apr", income: 18500, expenses: 4200, profit: 14300 },
  { month: "May", income: 21000, expenses: 4800, profit: 16200 },
  { month: "Jun", income: 19800, expenses: 5100, profit: 14700 },
  { month: "Jul", income: 23500, expenses: 4600, profit: 18900 },
  { month: "Aug", income: 25200, expenses: 5300, profit: 19900 },
  { month: "Sep", income: 26600, expenses: 5800, profit: 20800 },
];

export const mockReceipts: Receipt[] = [
  { id: "r1", date: "2026-09-15", merchant: "Staples", amount: 234.50, category: "Office Supplies", status: "categorized" },
  { id: "r2", date: "2026-09-14", merchant: "Delta Airlines", amount: 420.00, category: "Travel", status: "needs_review" },
  { id: "r3", date: "2026-09-13", merchant: "WeWork", amount: 1200.00, category: "Rent", status: "categorized" },
  { id: "r4", date: "2026-09-12", merchant: "Apple Store", amount: 1299.00, category: "Equipment", status: "categorized" },
  { id: "r5", date: "2026-09-11", merchant: "LegalEase", amount: 800.00, category: "Professional Services", status: "processing" },
  { id: "r6", date: "2026-09-10", merchant: "Comcast", amount: 189.00, category: "Utilities", status: "categorized" },
];

export const mockStats: DashboardStats = {
  totalIncome: 26600,
  totalExpenses: 5800,
  netProfit: 20800,
  pendingReceipts: 1,
  categorizedThisMonth: 14,
  monthlyGrowth: 4.4,
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
