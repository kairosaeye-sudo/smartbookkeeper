import initSqlJs, { Database } from 'sql.js';
import path from 'path';
import fs from 'fs';

let db: Database | null = null;
let dbPath: string | null = null;

async function getDb(): Promise<Database> {
  if (db) return db;

  const SQL = await initSqlJs();
  dbPath = path.join(process.cwd(), 'data', 'smartbookkeeper.db');

  // Ensure data directory exists
  const dataDir = path.dirname(dbPath);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  // Load existing database or create new one
  if (fs.existsSync(dbPath)) {
    const fileBuffer = fs.readFileSync(dbPath);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // Create tables
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      businessName TEXT NOT NULL,
      plan TEXT DEFAULT 'starter',
      createdAt TEXT DEFAULT (datetime('now'))
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      description TEXT NOT NULL,
      date TEXT NOT NULL,
      receiptId TEXT,
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS receipts (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      merchant TEXT NOT NULL,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      imageUrl TEXT,
      ocrText TEXT,
      status TEXT DEFAULT 'pending' CHECK(status IN ('processed', 'pending', 'error')),
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
      color TEXT DEFAULT '#7c3aed',
      createdAt TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  saveDb();
  return db;
}

function saveDb() {
  if (db && dbPath) {
    const data = db.export();
    fs.writeFileSync(dbPath, Buffer.from(data));
  }
}

export async function getUsers() {
  const database = await getDb();
  const result = database.exec('SELECT id, email, name, businessName, plan, createdAt FROM users');
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

export async function getUserByEmail(email: string) {
  const database = await getDb();
  const result = database.exec('SELECT * FROM users WHERE email = ?', [email]);
  if (result.length === 0) return null;
  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: any = {};
  columns.forEach((col: string, i: number) => {
    obj[col] = row[i];
  });
  return obj;
}

export async function getUserById(id: string) {
  const database = await getDb();
  const result = database.exec('SELECT id, email, name, businessName, plan, createdAt FROM users WHERE id = ?', [id]);
  if (result.length === 0) return null;
  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: any = {};
  columns.forEach((col: string, i: number) => {
    obj[col] = row[i];
  });
  return obj;
}

export async function createUser(user: { id: string; email: string; password: string; name: string; businessName: string }) {
  const database = await getDb();
  database.run(
    'INSERT INTO users (id, email, password, name, businessName) VALUES (?, ?, ?, ?, ?)',
    [user.id, user.email, user.password, user.name, user.businessName]
  );
  saveDb();
  return { id: user.id, email: user.email, name: user.name, businessName: user.businessName, plan: 'starter', createdAt: new Date().toISOString() };
}

export async function getTransactions(userId: string) {
  const database = await getDb();
  const result = database.exec('SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC', [userId]);
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

export async function createTransaction(tx: { id: string; userId: string; type: string; amount: number; category: string; description: string; date: string; receiptId?: string }) {
  const database = await getDb();
  database.run(
    'INSERT INTO transactions (id, userId, type, amount, category, description, date, receiptId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [tx.id, tx.userId, tx.type, tx.amount, tx.category, tx.description, tx.date, tx.receiptId || null]
  );
  saveDb();
  return tx;
}

export async function updateTransaction(id: string, userId: string, updates: { type?: string; amount?: number; category?: string; description?: string; date?: string }) {
  const database = await getDb();
  const fields: string[] = [];
  const values: any[] = [];
  if (updates.type !== undefined) { fields.push('type = ?'); values.push(updates.type); }
  if (updates.amount !== undefined) { fields.push('amount = ?'); values.push(updates.amount); }
  if (updates.category !== undefined) { fields.push('category = ?'); values.push(updates.category); }
  if (updates.description !== undefined) { fields.push('description = ?'); values.push(updates.description); }
  if (updates.date !== undefined) { fields.push('date = ?'); values.push(updates.date); }
  if (fields.length === 0) return null;
  values.push(id, userId);
  database.run(`UPDATE transactions SET ${fields.join(', ')} WHERE id = ? AND userId = ?`, values);
  saveDb();
  const result = database.exec('SELECT * FROM transactions WHERE id = ?', [id]);
  if (result.length === 0) return null;
  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: any = {};
  columns.forEach((col: string, i: number) => {
    obj[col] = row[i];
  });
  return obj;
}

export async function deleteTransaction(id: string, userId: string) {
  const database = await getDb();
  database.run('DELETE FROM transactions WHERE id = ? AND userId = ?', [id, userId]);
  saveDb();
}

export async function getReceipts(userId: string) {
  const database = await getDb();
  const result = database.exec('SELECT * FROM receipts WHERE userId = ? ORDER BY date DESC', [userId]);
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

export async function createReceipt(rx: { id: string; userId: string; merchant: string; amount: number; date: string; category: string; imageUrl?: string; ocrText?: string }) {
  const database = await getDb();
  database.run(
    'INSERT INTO receipts (id, userId, merchant, amount, date, category, imageUrl, ocrText, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [rx.id, rx.userId, rx.merchant, rx.amount, rx.date, rx.category, rx.imageUrl || '', rx.ocrText || '', 'processed']
  );
  saveDb();
  return { ...rx, status: 'processed' };
}

export async function updateReceipt(id: string, userId: string, updates: { merchant?: string; amount?: number; date?: string; category?: string; status?: string }) {
  const database = await getDb();
  const fields: string[] = [];
  const values: any[] = [];
  if (updates.merchant !== undefined) { fields.push('merchant = ?'); values.push(updates.merchant); }
  if (updates.amount !== undefined) { fields.push('amount = ?'); values.push(updates.amount); }
  if (updates.date !== undefined) { fields.push('date = ?'); values.push(updates.date); }
  if (updates.category !== undefined) { fields.push('category = ?'); values.push(updates.category); }
  if (updates.status !== undefined) { fields.push('status = ?'); values.push(updates.status); }
  if (fields.length === 0) return null;
  values.push(id, userId);
  database.run(`UPDATE receipts SET ${fields.join(', ')} WHERE id = ? AND userId = ?`, values);
  saveDb();
  const result = database.exec('SELECT * FROM receipts WHERE id = ?', [id]);
  if (result.length === 0) return null;
  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: any = {};
  columns.forEach((col: string, i: number) => {
    obj[col] = row[i];
  });
  return obj;
}

export async function getCategories(userId: string) {
  const database = await getDb();
  const result = database.exec('SELECT * FROM categories WHERE userId = ? ORDER BY name', [userId]);
  if (result.length === 0) return [];
  const columns = result[0].columns;
  return result[0].values.map((row: any[]) => {
    const obj: any = {};
    columns.forEach((col: string, i: number) => {
      obj[col] = row[i];
    });
    return obj;
  });
}

export async function createCategory(cat: { id: string; userId: string; name: string; type: string; color: string }) {
  const database = await getDb();
  database.run(
    'INSERT INTO categories (id, userId, name, type, color) VALUES (?, ?, ?, ?, ?)',
    [cat.id, cat.userId, cat.name, cat.type, cat.color]
  );
  saveDb();
  return cat;
}

export async function updateCategory(id: string, userId: string, updates: { name?: string; type?: string; color?: string }) {
  const database = await getDb();
  const fields: string[] = [];
  const values: any[] = [];
  if (updates.name !== undefined) { fields.push('name = ?'); values.push(updates.name); }
  if (updates.type !== undefined) { fields.push('type = ?'); values.push(updates.type); }
  if (updates.color !== undefined) { fields.push('color = ?'); values.push(updates.color); }
  if (fields.length === 0) return null;
  values.push(id, userId);
  database.run(`UPDATE categories SET ${fields.join(', ')} WHERE id = ? AND userId = ?`, values);
  saveDb();
  const result = database.exec('SELECT * FROM categories WHERE id = ?', [id]);
  if (result.length === 0) return null;
  const columns = result[0].columns;
  const row = result[0].values[0];
  const obj: any = {};
  columns.forEach((col: string, i: number) => {
    obj[col] = row[i];
  });
  return obj;
}

export async function getReport(userId: string) {
  const database = await getDb();

  // Total income
  const incomeResult = database.exec("SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE userId = ? AND type = 'income'", [userId]);
  const totalIncome = incomeResult[0]?.values[0]?.[0] || 0;

  // Total expenses
  const expenseResult = database.exec("SELECT COALESCE(SUM(amount), 0) as total FROM transactions WHERE userId = ? AND type = 'expense'", [userId]);
  const totalExpenses = expenseResult[0]?.values[0]?.[0] || 0;

  // Transaction count
  const countResult = database.exec('SELECT COUNT(*) as count FROM transactions WHERE userId = ?', [userId]);
  const transactionCount = countResult[0]?.values[0]?.[0] || 0;

  // Top categories
  const topCatResult = database.exec(
    "SELECT category, SUM(amount) as total FROM transactions WHERE userId = ? AND type = 'expense' GROUP BY category ORDER BY total DESC LIMIT 5",
    [userId]
  );
  const topCategories = topCatResult.length > 0
    ? topCatResult[0].values.map((row: any[]) => ({ name: row[0], amount: row[1] }))
    : [];

  // Monthly data (last 6 months)
  const monthlyResult = database.exec(
    "SELECT strftime('%Y-%m', date) as month, type, SUM(amount) as total FROM transactions WHERE userId = ? GROUP BY month, type ORDER BY month DESC LIMIT 12",
    [userId]
  );
  const monthlyMap: Record<string, { income: number; expenses: number }> = {};
  if (monthlyResult.length > 0) {
    monthlyResult[0].values.forEach((row: any[]) => {
      const month = row[0];
      const type = row[1];
      const total = row[2];
      if (!monthlyMap[month]) monthlyMap[month] = { income: 0, expenses: 0 };
      if (type === 'income') monthlyMap[month].income = total;
      else monthlyMap[month].expenses = total;
    });
  }
  const monthlyData = Object.entries(monthlyMap)
    .map(([month, data]) => ({ month, ...data }))
    .reverse();

  const ti = Number(totalIncome) || 0;
  const te = Number(totalExpenses) || 0;
  return {
    totalIncome: ti,
    totalExpenses: te,
    netProfit: ti - te,
    transactionCount: Number(transactionCount) || 0,
    topCategories,
    monthlyData,
  };
}
