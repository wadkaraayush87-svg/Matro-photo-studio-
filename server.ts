import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("studio.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    cover_image TEXT
  );

  CREATE TABLE IF NOT EXISTS packages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER,
    name TEXT NOT NULL,
    price REAL,
    duration TEXT,
    photos_count INTEGER,
    details TEXT,
    FOREIGN KEY(category_id) REFERENCES categories(id)
  );

  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    whatsapp TEXT,
    category TEXT,
    message TEXT,
    zoom_date TEXT,
    zoom_time TEXT,
    payment_status TEXT DEFAULT 'Pending',
    payment_screenshot TEXT,
    status TEXT DEFAULT 'New',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author TEXT NOT NULL,
    rating INTEGER,
    comment TEXT,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Seed initial data if empty
const categoryCount = db.prepare("SELECT COUNT(*) as count FROM categories").get() as { count: number };
if (categoryCount.count === 0) {
  const insertCat = db.prepare("INSERT INTO categories (name, description, cover_image) VALUES (?, ?, ?)");
  insertCat.run("Baby Shoot", "Precious First Moments", "https://picsum.photos/seed/baby/800/600");
  insertCat.run("Wedding Shoot", "Forever Begins Here", "https://picsum.photos/seed/wedding/800/600");
  insertCat.run("Pre-Wedding Shoot", "Your Love Story Begins", "https://picsum.photos/seed/prewedding/800/600");
  insertCat.run("Mehendi Shoot", "Colors of Tradition", "https://picsum.photos/seed/mehendi/800/600");
  insertCat.run("Haldi Shoot", "Golden Celebrations", "https://picsum.photos/seed/haldi/800/600");
  insertCat.run("Maternity Shoot", "Celebrating New Life", "https://picsum.photos/seed/maternity/800/600");
  insertCat.run("Engagement Shoot", "Ring of Promise", "https://picsum.photos/seed/engagement/800/600");
  insertCat.run("Birthday Shoot", "Celebrate Every Year", "https://picsum.photos/seed/birthday/800/600");

  const cats = db.prepare("SELECT id, name FROM categories").all() as { id: number, name: string }[];
  const insertPkg = db.prepare("INSERT INTO packages (category_id, name, price, duration, photos_count, details) VALUES (?, ?, ?, ?, ?, ?)");
  
  cats.forEach(cat => {
    insertPkg.run(cat.id, "Basic Package", 5000, "2 Hours", 20, "Standard editing, 1 location");
    insertPkg.run(cat.id, "Premium Package", 12000, "5 Hours", 50, "Advanced retouching, 2 locations, Album");
    insertPkg.run(cat.id, "Luxury Package", 25000, "Full Day", 100, "Cinematic video, Premium Album, Multiple locations");
  });

  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("qr_code", "https://i.imgur.com/your-qr-placeholder.png");
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("booking_fee", "9");
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?)").run("whatsapp_number", "9324236203");
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '10mb' }));

  // API Routes
  app.get("/api/categories", (req, res) => {
    const categories = db.prepare("SELECT * FROM categories").all();
    res.json(categories);
  });

  app.get("/api/categories/:id", (req, res) => {
    const category = db.prepare("SELECT * FROM categories WHERE id = ?").get(req.params.id);
    const packages = db.prepare("SELECT * FROM packages WHERE category_id = ?").all(req.params.id);
    res.json({ ...category, packages });
  });

  app.post("/api/leads", (req, res) => {
    const { name, email, phone, whatsapp, category, message } = req.body;
    const info = db.prepare(`
      INSERT INTO leads (name, email, phone, whatsapp, category, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(name, email, phone, whatsapp, category, message);
    res.json({ id: info.lastInsertRowid });
  });

  app.patch("/api/leads/:id/zoom", (req, res) => {
    const { date, time } = req.body;
    db.prepare("UPDATE leads SET zoom_date = ?, zoom_time = ? WHERE id = ?").run(date, time, req.params.id);
    res.json({ success: true });
  });

  app.patch("/api/leads/:id/payment", (req, res) => {
    const { screenshot } = req.body;
    db.prepare("UPDATE leads SET payment_screenshot = ?, payment_status = 'Paid' WHERE id = ?").run(screenshot, req.params.id);
    res.json({ success: true });
  });

  app.get("/api/admin/leads", (req, res) => {
    const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
    res.json(leads);
  });

  app.get("/api/reviews", (req, res) => {
    const reviews = db.prepare("SELECT * FROM reviews").all();
    res.json(reviews);
  });

  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "dist", "index.html")));
  }

  app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://localhost:3000");
  });
}

startServer();
