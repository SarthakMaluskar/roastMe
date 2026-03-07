# 🔥 RoastMe – Let AI judge your LeetCode skills

<img width="500" alt="RoastMe Screenshot" src="https://github.com/user-attachments/assets/01c46176-8bf1-445f-b0f1-db16c4e4f650" />

> Enter any LeetCode username and get a AI-generated roast based on real stats.

---

## 🚀 Features

- Enter any LeetCode username
- Fetches real stats from the LeetCode GraphQL API
- Extracts:
  - Total problems solved
  - Easy / Medium / Hard count
  - Longest solving streak
  - Contest rating
  - Recent activity
- Generates AI-powered savage roasts
- Clean and minimal React UI
- Fast responses using Groq inference API

---

## 🛠️ Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React, Axios, HTML/CSS            |
| Backend   | Node.js, Express.js, Axios        |
| AI Model  | Llama 3 (via Groq)                |
| APIs      | LeetCode GraphQL API, Groq AI API |
| Tools     | Nodemon, dotenv                   |

---

## 📂 Project Structure

```
roastMe/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── server/
    ├── index.js
    ├── package.json
    └── .env
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/roastMe.git
cd roastMe
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file:

```env
GROQ_API_KEY=your_api_key_here
```

Run the backend server:

```bash
nodemon index.js
```

> Server will run on: `http://localhost:3000`

### 3️⃣ Setup Frontend

```bash
cd ../frontend
npm install
npm start
```

> Frontend will run on: `http://localhost:5173`

---

## 🔗 How It Works

```
User enters LeetCode username
         ↓
  React frontend sends request
         ↓
    Express backend API
         ↓
Fetch stats from LeetCode GraphQL
         ↓
  Extract stats (solved, streak, rating)
         ↓
    Send stats to Groq AI (Llama 3)
         ↓
     AI generates roast
         ↓
   Roast returned to React UI
```

---

## ⚡ Example Roast

> *"200 problems solved and only 3 of them are hard? Your longest streak is 2 days — even Duolingo users are more consistent. That 1200 contest rating is proof you attend contests just to donate rating."*

---

## 📄 License

MIT © 2024
