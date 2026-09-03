# 🏪 POS: Mobile App (Flask + SQLite + PWA)

A mobile-first, zero-printer Point of Sale (POS) web application designed for speed, simplicity, and replacing paper notebooks. Built with **Python (Flask)**, **SQLAlchemy (SQLite)**, **HTML/CSS/Jinja2**, and **Vanilla JavaScript**.

---

## ✅ Locked Setup Decisions

- **No second printer** — Zero receipt printer overhead.
- **Paytm machine stays only for processing online payment** — Ignore its receipt in POS.
- **Cash sales** — Just log in POS, no receipt printed.
- **Notebook — fully replaced by POS's Daily Ledger** — Automatically tracks time, items, quantity, and payment mode.
- **Only the end-of-day summary gets printed (or WhatsApped) for the owner**.

---

## 📱 Pages & Architecture (8 Pages Built)

### 1. **Login / PIN Lock (`/login`)**
- Personal single-user numeric keypad access ("for yourself only").
- Visual PIN dots with default PIN: `1234` (customizable in Settings).
- Lock button in top bar to secure screen instantly.

### 2. **Dashboard / Home (`/dashboard`)**
- Today's quick-glance stats: Total Revenue, Cash vs Online split, Total Orders, Best Selling Item.
- Quick action buttons to Billing, Ledger, EOD Summary, and Menu.
- Recent sales stream with mode badges.

### 3. **Billing Page (Core POS — `/billing`)**
- Touch-optimized item grid with category filter pills and instant search.
- Live Bill Drawer: increment/decrement quantities, automatic subtotal & GST tax calculation.
- Big toggle for **💵 Cash** vs **📱 Online (Paytm/UPI)**.
- **"Record Sale (No Print)"**: Logs sale instantly to the SQLite database, shows a toast alert, and resets for the next customer in milliseconds.

### 4. **Product Management Page (`/products`)**
- Full CRUD for menu items and categories.
- Pre-populated with delicious sample ice cream treats (Cones, Scoops, Sundaes, Thick Shakes, Family Packs, and Waffles).
- Add / Edit modal forms to update prices and toggle active status.

### 5. **Daily Ledger Page (`/ledger`)**
- **Replaces the manual notebook.**
- Displays every transaction in clean row format: `Time | Receipt | Item(s) × Qty | Payment Mode | Total (₹)`.
- Filter by Today, Yesterday, or any custom date.
- Ability to void/delete mistaken entries.
- One-click CSV export.

### 6. **Sales Reports Page (`/reports`)**
- Filter by Today, Last 7 Days, Last 30 Days, or This Month.
- **Cash vs Online Split**: Visual progress bar showing exact revenue percentage breakdown.
- **Revenue Trend Chart**: Interactive Chart.js bar chart comparing daily Cash vs Online sales.
- **Best Sellers Ranking Table**: Top 10 items by quantity sold and revenue generated.

### 7. **End-of-Day Summary Page (`/eod_summary`)**
- *The one deliverable for the shop owner.*
- Summary slip showing: Date, Shop Name, Total Cash Sales, Total Online (Paytm) Sales, Grand Total, Total Orders, Best Seller, and Item-wise breakdown.
- **🖨️ Print Summary Button**: Optimized `@media print` styling that formats a clean paper/PDF report without website headers or buttons.
- **💬 WhatsApp Owner Button**: Pre-formats a clean text summary and opens WhatsApp.
- **📋 Copy Summary Text**: Copies closing numbers to clipboard.

### 8. **Settings & Backup Page (`/settings`)**
- Customize Shop Name and Owner Phone Number.
- Enable/disable GST and adjust tax rate (%).
- Update personal 4-digit PIN lock.
- **Backup & Export**: Download full Sales Ledger or Menu Products as CSV files.
- **System Reset / Clear**: Reset sample menu data or wipe all transactions ready for live shop use.

---

## 🚀 Running Locally & Accessing on Mobile Phone

### 1. Running on Laptop / Desktop
The app uses Python 3 + Flask. Start the server from your terminal:
```bash
python3 app.py
```
By default, the app listens on **all network interfaces (`0.0.0.0:5000`)** so you can connect from any device on your local WiFi.

### 2. Accessing from your Mobile Phone (Same WiFi)
1. Find your laptop's local IP address on your WiFi network (e.g. `192.168.1.100` or `10.0.0.5`).
2. On your phone's browser (Chrome / Safari), open:
   ```
   http://YOUR_LAPTOP_IP:5000/
   ```
3. **PWA Install (Add to Home Screen):**
   - On Chrome (Android): Tap menu (3 dots) → **"Add to Home Screen"** or **"Install App"**.
   - On Safari (iPhone): Tap Share icon → **"Add to Home Screen"**.
   - The app will run in standalone fullscreen mode with a custom app icon!

---

## 💡 Quick Test Guide
- **PIN Lock Code:** Enter `1234` to unlock the app.
- **Sample Data:** Comes pre-seeded with 14 ice cream menu items and 8 sample transactions for today so you can test all reports immediately.
- **Resetting Data:** Go to **Settings** → **"Clear All Sales Transactions"** when you are ready to use it for real billing in your shop.
