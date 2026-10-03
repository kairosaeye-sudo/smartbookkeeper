'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { api } from '@/lib/api';
import ProtectedRoute from '@/components/ProtectedRoute';
import Navbar from '@/components/Navbar';
import { Transaction, Receipt, Category, Report } from '@/lib/types';

function DashboardContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'receipts' | 'categories' | 'reports'>('overview');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  // Transaction form
  const [showTxForm, setShowTxForm] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);
  const [txForm, setTxForm] = useState({ type: 'expense' as 'income' | 'expense', amount: '', category: '', description: '', date: '' });

  // Receipt form
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [receiptForm, setReceiptForm] = useState({ merchant: '', amount: '', date: '', category: '', imageUrl: '' });

  // Category form
  const [showCatForm, setShowCatForm] = useState(false);
  const [editingCat, setEditingCat] = useState<Category | null>(null);
  const [catForm, setCatForm] = useState({ name: '', type: 'expense' as 'income' | 'expense', color: '#7c3aed' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [txRes, rxRes, catRes, repRes] = await Promise.all([
        api.getTransactions(),
        api.getReceipts(),
        api.getCategories(),
        api.getReport(),
      ]);
      setTransactions(txRes.transactions);
      setReceipts(rxRes.receipts);
      setCategories(catRes.categories);
      setReport(repRes.report);
    } catch (err) {
      console.error('Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Transaction handlers
  const handleTxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTx) {
        await api.updateTransaction(editingTx.id, { ...txForm, amount: parseFloat(txForm.amount) });
      } else {
        await api.createTransaction({ ...txForm, amount: parseFloat(txForm.amount) });
      }
      setShowTxForm(false);
      setEditingTx(null);
      setTxForm({ type: 'expense', amount: '', category: '', description: '', date: '' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditTx = (tx: Transaction) => {
    setEditingTx(tx);
    setTxForm({ type: tx.type, amount: tx.amount.toString(), category: tx.category, description: tx.description, date: tx.date });
    setShowTxForm(true);
  };

  const handleDeleteTx = async (id: string) => {
    if (!confirm('Delete this transaction?')) return;
    try {
      await api.deleteTransaction(id);
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Receipt handlers
  const handleReceiptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createReceipt({ ...receiptForm, amount: parseFloat(receiptForm.amount) });
      setShowReceiptForm(false);
      setReceiptForm({ merchant: '', amount: '', date: '', category: '', imageUrl: '' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Category handlers
  const handleCatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCat) {
        await api.updateCategory(editingCat.id, catForm);
      } else {
        await api.createCategory(catForm);
      }
      setShowCatForm(false);
      setEditingCat(null);
      setCatForm({ name: '', type: 'expense', color: '#7c3aed' });
      loadData();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleEditCat = (cat: Category) => {
    setEditingCat(cat);
    setCatForm({ name: cat.name, type: cat.type, color: cat.color });
    setShowCatForm(true);
  };

  const formatCurrency = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n);
  const formatDate = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'receipts', label: 'Receipts' },
    { id: 'categories', label: 'Categories' },
    { id: 'reports', label: 'Reports' },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Dashboard</h1>
            <p className="text-zinc-400 mt-1">Welcome back, {user?.name}</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview */}
          {activeTab === 'overview' && report && (
            <div className="space-y-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="card">
                  <p className="text-sm text-zinc-400 mb-1">Total Income</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(report.totalIncome)}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-zinc-400 mb-1">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-400">{formatCurrency(report.totalExpenses)}</p>
                </div>
                <div className="card">
                  <p className="text-sm text-zinc-400 mb-1">Net Profit</p>
                  <p className={`text-2xl font-bold ${report.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {formatCurrency(report.netProfit)}
                  </p>
                </div>
                <div className="card">
                  <p className="text-sm text-zinc-400 mb-1">Transactions</p>
                  <p className="text-2xl font-bold text-white">{report.transactionCount}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Categories</h3>
                  {report.topCategories.length > 0 ? (
                    <div className="space-y-3">
                      {report.topCategories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between">
                          <span className="text-sm text-zinc-300">{cat.name}</span>
                          <span className="text-sm font-medium text-white">{formatCurrency(cat.amount)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm">No data yet</p>
                  )}
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-white mb-4">Monthly Summary</h3>
                  {report.monthlyData.length > 0 ? (
                    <div className="space-y-3">
                      {report.monthlyData.map((m) => (
                        <div key={m.month} className="flex items-center justify-between">
                          <span className="text-sm text-zinc-300">{m.month}</span>
                          <div className="flex gap-4">
                            <span className="text-sm text-green-400">+{formatCurrency(m.income)}</span>
                            <span className="text-sm text-red-400">-{formatCurrency(m.expenses)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm">No data yet</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Transactions */}
          {activeTab === 'transactions' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Transactions</h2>
                <button onClick={() => { setShowTxForm(true); setEditingTx(null); setTxForm({ type: 'expense', amount: '', category: '', description: '', date: '' }); }} className="btn-primary text-sm">
                  + Add Transaction
                </button>
              </div>

              {showTxForm && (
                <form onSubmit={handleTxSubmit} className="card space-y-4">
                  <h3 className="text-white font-medium">{editingTx ? 'Edit' : 'Add'} Transaction</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Type</label>
                      <select className="input" value={txForm.type} onChange={(e) => setTxForm({ ...txForm, type: e.target.value as 'income' | 'expense' })}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Amount</label>
                      <input type="number" step="0.01" className="input" value={txForm.amount} onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })} placeholder="0.00" required />
                    </div>
                    <div>
                      <label className="label">Category</label>
                      <input type="text" className="input" value={txForm.category} onChange={(e) => setTxForm({ ...txForm, category: e.target.value })} placeholder="e.g. Office Supplies" required />
                    </div>
                    <div>
                      <label className="label">Date</label>
                      <input type="date" className="input" value={txForm.date} onChange={(e) => setTxForm({ ...txForm, date: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label className="label">Description</label>
                    <input type="text" className="input" value={txForm.description} onChange={(e) => setTxForm({ ...txForm, description: e.target.value })} placeholder="What was this for?" required />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary text-sm">{editingTx ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => { setShowTxForm(false); setEditingTx(null); }} className="btn-secondary text-sm">Cancel</button>
                  </div>
                </form>
              )}

              <div className="card overflow-x-auto">
                {transactions.length > 0 ? (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-zinc-400 border-b border-zinc-800">
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Description</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium text-right">Amount</th>
                        <th className="pb-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-zinc-800/50">
                          <td className="py-3 text-zinc-300">{formatDate(tx.date)}</td>
                          <td className="py-3 text-white">{tx.description}</td>
                          <td className="py-3 text-zinc-400">{tx.category}</td>
                          <td className={`py-3 text-right font-medium ${tx.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                            {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                          </td>
                          <td className="py-3 text-right">
                            <button onClick={() => handleEditTx(tx)} className="text-zinc-400 hover:text-white mr-3">Edit</button>
                            <button onClick={() => handleDeleteTx(tx.id)} className="text-zinc-400 hover:text-red-400">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-zinc-500 text-sm py-8 text-center">No transactions yet. Add your first one!</p>
                )}
              </div>
            </div>
          )}

          {/* Receipts */}
          {activeTab === 'receipts' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Receipts</h2>
                <button onClick={() => setShowReceiptForm(true)} className="btn-primary text-sm">+ Add Receipt</button>
              </div>

              {showReceiptForm && (
                <form onSubmit={handleReceiptSubmit} className="card space-y-4">
                  <h3 className="text-white font-medium">Add Receipt</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label">Merchant</label>
                      <input type="text" className="input" value={receiptForm.merchant} onChange={(e) => setReceiptForm({ ...receiptForm, merchant: e.target.value })} placeholder="e.g. Office Depot" required />
                    </div>
                    <div>
                      <label className="label">Amount</label>
                      <input type="number" step="0.01" className="input" value={receiptForm.amount} onChange={(e) => setReceiptForm({ ...receiptForm, amount: e.target.value })} placeholder="0.00" required />
                    </div>
                    <div>
                      <label className="label">Date</label>
                      <input type="date" className="input" value={receiptForm.date} onChange={(e) => setReceiptForm({ ...receiptForm, date: e.target.value })} required />
                    </div>
                    <div>
                      <label className="label">Category</label>
                      <input type="text" className="input" value={receiptForm.category} onChange={(e) => setReceiptForm({ ...receiptForm, category: e.target.value })} placeholder="e.g. Office Supplies" required />
                    </div>
                  </div>
                  <div>
                    <label className="label">Image URL</label>
                    <input type="url" className="input" value={receiptForm.imageUrl} onChange={(e) => setReceiptForm({ ...receiptForm, imageUrl: e.target.value })} placeholder="https://..." />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary text-sm">Add Receipt</button>
                    <button type="button" onClick={() => setShowReceiptForm(false)} className="btn-secondary text-sm">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {receipts.length > 0 ? (
                  receipts.map((r) => (
                    <div key={r.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-white font-medium">{r.merchant}</p>
                          <p className="text-sm text-zinc-400">{formatDate(r.date)}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          r.status === 'processed' ? 'bg-green-500/10 text-green-400' :
                          r.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                          'bg-red-500/10 text-red-400'
                        }`}>
                          {r.status}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-white">{formatCurrency(r.amount)}</p>
                      <p className="text-sm text-zinc-400 mt-1">{r.category}</p>
                    </div>
                  ))
                ) : (
                  <div className="card sm:col-span-2 lg:col-span-3">
                    <p className="text-zinc-500 text-sm py-8 text-center">No receipts yet. Add your first one!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Categories */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Categories</h2>
                <button onClick={() => { setShowCatForm(true); setEditingCat(null); setCatForm({ name: '', type: 'expense', color: '#7c3aed' }); }} className="btn-primary text-sm">+ Add Category</button>
              </div>

              {showCatForm && (
                <form onSubmit={handleCatSubmit} className="card space-y-4">
                  <h3 className="text-white font-medium">{editingCat ? 'Edit' : 'Add'} Category</h3>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="label">Name</label>
                      <input type="text" className="input" value={catForm.name} onChange={(e) => setCatForm({ ...catForm, name: e.target.value })} placeholder="e.g. Marketing" required />
                    </div>
                    <div>
                      <label className="label">Type</label>
                      <select className="input" value={catForm.type} onChange={(e) => setCatForm({ ...catForm, type: e.target.value as 'income' | 'expense' })}>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Color</label>
                      <input type="color" className="input h-[42px] cursor-pointer" value={catForm.color} onChange={(e) => setCatForm({ ...catForm, color: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="btn-primary text-sm">{editingCat ? 'Update' : 'Add'}</button>
                    <button type="button" onClick={() => { setShowCatForm(false); setEditingCat(null); }} className="btn-secondary text-sm">Cancel</button>
                  </div>
                </form>
              )}

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <div key={cat.id} className="card flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                        <div>
                          <p className="text-white font-medium">{cat.name}</p>
                          <p className="text-xs text-zinc-400">{cat.type}</p>
                        </div>
                      </div>
                      <button onClick={() => handleEditCat(cat)} className="text-zinc-400 hover:text-white text-sm">Edit</button>
                    </div>
                  ))
                ) : (
                  <div className="card sm:col-span-2 lg:col-span-3">
                    <p className="text-zinc-500 text-sm py-8 text-center">No categories yet. Add your first one!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reports */}
          {activeTab === 'reports' && report && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-white">Reports</h2>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-white font-medium mb-4">Profit & Loss</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Total Income</span>
                      <span className="text-green-400 font-medium">{formatCurrency(report.totalIncome)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Total Expenses</span>
                      <span className="text-red-400 font-medium">{formatCurrency(report.totalExpenses)}</span>
                    </div>
                    <hr className="border-zinc-800" />
                    <div className="flex justify-between">
                      <span className="text-white font-medium">Net Profit</span>
                      <span className={`font-bold ${report.netProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(report.netProfit)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h3 className="text-white font-medium mb-4">Monthly Breakdown</h3>
                  {report.monthlyData.length > 0 ? (
                    <div className="space-y-3">
                      {report.monthlyData.map((m) => (
                        <div key={m.month} className="flex items-center justify-between">
                          <span className="text-zinc-300">{m.month}</span>
                          <div className="flex gap-4">
                            <span className="text-green-400 text-sm">+{formatCurrency(m.income)}</span>
                            <span className="text-red-400 text-sm">-{formatCurrency(m.expenses)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-zinc-500 text-sm">No data yet</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
