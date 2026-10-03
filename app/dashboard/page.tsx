"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Receipt,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PieChart,
  FileText,
  Settings,
  Bell,
  Search,
  Plus,
  Upload,
  Filter,
  Download,
  Eye,
  Check,
  Clock,
  AlertCircle,
  BookOpen,
  Menu,
  X,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  mockTransactions,
  mockCategories,
  mockMonthlyData,
  mockReceipts,
  mockStats,
  formatCurrency,
  formatDate,
} from "@/lib/mock-data";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "transactions", label: "Transactions", icon: DollarSign },
    { id: "receipts", label: "Receipts", icon: Receipt },
    { id: "reports", label: "Reports", icon: FileText },
    { id: "categories", label: "Categories", icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-2 h-16 px-6 border-b border-gray-100">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">SmartBookkeeper</span>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 w-64">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="bg-transparent text-sm outline-none flex-1"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
                  JD
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6">
          {activeTab === "overview" && <OverviewTab />}
          {activeTab === "transactions" && <TransactionsTab />}
          {activeTab === "receipts" && <ReceiptsTab />}
          {activeTab === "reports" && <ReportsTab />}
          {activeTab === "categories" && <CategoriesTab />}
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income"
          value={formatCurrency(mockStats.totalIncome)}
          change="+4.4%"
          positive={true}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Total Expenses"
          value={formatCurrency(mockStats.totalExpenses)}
          change="-2.1%"
          positive={true}
          icon={TrendingDown}
          color="red"
        />
        <StatCard
          title="Net Profit"
          value={formatCurrency(mockStats.netProfit)}
          change="+8.2%"
          positive={true}
          icon={DollarSign}
          color="blue"
        />
        <StatCard
          title="Pending Receipts"
          value={mockStats.pendingReceipts.toString()}
          change="Needs review"
          positive={false}
          icon={Clock}
          color="orange"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Income vs Expenses Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Income vs Expenses</h3>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-gray-600">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-64 flex items-end justify-between gap-2">
            {mockMonthlyData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center h-48">
                  <div
                    className="w-4 bg-green-400 rounded-t-sm"
                    style={{ height: `${(d.income / 30000) * 100}%` }}
                  ></div>
                  <div
                    className="w-4 bg-red-400 rounded-t-sm"
                    style={{ height: `${(d.expenses / 30000) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Categories</h3>
          <div className="space-y-4">
            {mockCategories.slice(0, 6).map((cat, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">{cat.icon} {cat.name}</span>
                  <span className="font-medium text-gray-900">{formatCurrency(cat.spent)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min((cat.spent / 2000) * 100, 100)}%`,
                      backgroundColor: cat.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
          <Link
            href="/dashboard?tab=transactions"
            className="text-blue-600 text-sm font-medium hover:text-blue-700"
          >
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.slice(0, 5).map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(t.date)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.category}</td>
                  <td className={`px-6 py-4 text-sm font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TransactionsTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Transaction
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Description</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-600">{formatDate(t.date)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{t.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{t.category}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      t.type === "income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {t.type}
                    </span>
                  </td>
                  <td className={`px-6 py-4 text-sm font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={t.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ReceiptsTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Receipts</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Upload className="w-4 h-4" />
          Upload Receipt
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockReceipts.map((r) => (
          <div key={r.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Receipt className="w-6 h-6 text-gray-400" />
              </div>
              <ReceiptStatusBadge status={r.status} />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{r.merchant}</h4>
            <p className="text-sm text-gray-500 mb-2">{formatDate(r.date)}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-gray-900">{formatCurrency(r.amount)}</span>
              <span className="text-sm text-gray-500">{r.category}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportsTab() {
  const reports = [
    { name: "Profit & Loss Statement", description: "Monthly P&L for September 2026", date: "Sep 2026", type: "PDF" },
    { name: "Balance Sheet", description: "As of September 30, 2026", date: "Sep 2026", type: "PDF" },
    { name: "Tax Summary", description: "Q3 2026 tax preparation report", date: "Q3 2026", type: "PDF" },
    { name: "Expense Breakdown", description: "Detailed expense analysis by category", date: "Sep 2026", type: "Excel" },
    { name: "Cash Flow Statement", description: "Monthly cash flow analysis", date: "Sep 2026", type: "PDF" },
    { name: "Annual Summary", description: "Year-to-date financial summary", date: "2026", type: "PDF" },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Generate Report
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">{r.type}</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">{r.name}</h4>
            <p className="text-sm text-gray-500 mb-4">{r.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">{r.date}</span>
              <button className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700">
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesTab() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 border-b border-gray-100 bg-gray-50">
              <th className="px-6 py-3 font-medium">Category</th>
              <th className="px-6 py-3 font-medium">Budget</th>
              <th className="px-6 py-3 font-medium">Spent</th>
              <th className="px-6 py-3 font-medium">Remaining</th>
              <th className="px-6 py-3 font-medium">Progress</th>
            </tr>
          </thead>
          <tbody>
            {mockCategories.filter(c => c.budget > 0).map((cat, i) => {
              const remaining = cat.budget - cat.spent;
              const pct = Math.min((cat.spent / cat.budget) * 100, 100);
              return (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <span className="font-medium text-gray-900">{cat.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{formatCurrency(cat.budget)}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(cat.spent)}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {formatCurrency(Math.abs(remaining))}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${pct}%`, backgroundColor: cat.color }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 w-10">{pct.toFixed(0)}%</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
  color,
}: {
  title: string;
  value: string;
  change: string;
  positive: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-lg ${colorMap[color]} flex items-center justify-center`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${positive ? "text-green-600" : "text-orange-600"}`}>
          {positive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {change}
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    reviewed: "bg-green-100 text-green-700",
    categorized: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || "bg-gray-100 text-gray-700"}`}>
      {status}
    </span>
  );
}

function ReceiptStatusBadge({ status }: { status: string }) {
  const config: Record<string, { icon: React.ComponentType<{ className?: string }>; label: string; color: string }> = {
    categorized: { icon: Check, label: "Categorized", color: "bg-green-100 text-green-700" },
    processing: { icon: Clock, label: "Processing", color: "bg-blue-100 text-blue-700" },
    needs_review: { icon: AlertCircle, label: "Needs Review", color: "bg-orange-100 text-orange-700" },
  };
  const c = config[status] || config.processing;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.color}`}>
      <c.icon className="w-3 h-3" />
      {c.label}
    </span>
  );
}
