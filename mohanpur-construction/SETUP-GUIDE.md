# 🏗️ Mohanpur Construction — Home Build Expense Tracker

A beautiful website to track every rupee of your home construction — **rod, cement, chips, sand, bricks, labour, soil, paper, tiles, pipe, electricity**, and more.

Built for **4 members**: Surjendu, Madhumita, Subhendu & Mamata.

You have these files:

- **`index.html`** — the website (hosts on GitHub Pages, free).
- **`Code.gs`** — Google Apps Script that reads/writes your Google Sheet (free database).
- **`manifest.json`, `service-worker.js`, `icons/`** — install as a phone app (PWA).
- **`photos/`** — member photos shown on the site.

---

## How it works

> **GitHub Pages** shows the website → the site talks to **Google Apps Script** → the script stores every entry in your **Google Sheet**.

No server, no monthly cost. All 4 members open the same link on phone or laptop.

---

## ✅ Try it first (no setup)

Open `index.html` in a browser. PIN is **`2026`**.

Runs in *demo mode* — data saves only in that browser. Good for testing.
For shared data across all members, follow Steps 1–3 below.

---

## Step 1 — Create your Google Sheet

1. Go to <https://sheets.google.com> → **Blank spreadsheet**. Name it `Mohanpur Construction`.
2. **Rename the bottom tab** to exactly: `hisab-mohanpur-construction`
3. In **row 1** of that tab, type these 7 headers (columns A–G):

   | id | date | member | flow | category | amount | note |
   |----|------|--------|------|----------|--------|------|

3. Menu: **Extensions → Apps Script**.
4. Delete existing code, **paste all of `Code.gs`**, Save.
5. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Deploy, authorize, **copy the Web app URL**.

---

## Step 2 — Connect the website

1. Open `index.html` in a text editor.
2. Find the **CONFIG** block and paste your URL:

   ```js
   const CONFIG = {
     APPS_SCRIPT_URL: "https://script.google.com/macros/s/YOUR_ID/exec",
     PIN: "2026",
     MEMBERS: ["Surjendu", "Madhumita", "Subhendu", "Mamata"]
   };
   ```

3. Change the PIN if you like. Save.

The status pill will show **"Connected to Google Sheet"** with a green dot.

---

## Step 3 — Publish on GitHub Pages

1. Push this repo to GitHub (or upload files).
2. **Settings → Pages** → Branch `main`, folder `/ (root)` → Save.
3. Your live link: `https://<username>.github.io/mohanpur-construction/`

Share the link + PIN with all 4 members.

Upload these files (keep folder structure):

```
index.html
manifest.json
service-worker.js
icons/
photos/
```

`Code.gs` stays in Google Sheets only — do not upload it to GitHub.

---

## Features

| Tab | What it does |
|-----|--------------|
| **Dashboard** | Fund balance, credit vs debit, monthly charts, material pie chart, build insights |
| **Add Entry** | Credit (money in) or Debit (construction spend) with quick amount & category chips |
| **Materials** | Visual breakdown of spend by Rod, Cement, Sand, Bricks, Labour, etc. |
| **All Records** | Full log with filters; **edit** or **delete** any entry |

---

## Money model

- **Credit** = money added for the build (member contribution, loan, refund).
- **Debit** = money spent (stored as `Expense` in the Sheet).

> **Available Fund = Total Credit − Total Debit**

---

## Debit categories

Rod · Cement · Chips · Sand · Bricks · Labour · Soil · Paper · Tiles · Pipe · Electricity · Other

---

## Install as phone app

After GitHub Pages is live (https required):

**Android:** Chrome → ⋮ → Install app  
**iPhone:** Safari → Share → Add to Home Screen

Bump `CACHE_VERSION` in `service-worker.js` after updates.

---

Questions? Just ask.
