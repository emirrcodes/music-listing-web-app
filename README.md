# Chinook Music App 🎵

This is a fullstack application developed using the **Chinook Database**, aiming to demonstrate data filtering, detailed UI rendering, and backend API creation for a music-related dataset.

---

## 🏗️ Stack

- **Frontend:** React / Next.js (Fast and responsive UI)
- **Backend:** JavaScript (Node.js with Express)
- **Database:** PostgreSQL (with Chinook dataset)

---

## 🎯 Features

### 🎶 Track Listing
- View a complete list of tracks.
- Filter by:
  - **Genre**
  - **Length (duration)**
  - **Price**

### 📄 Track Detail
- View track details alongside artist info.

### 💿 Album Listing
- View a complete list of albums.

### 📄 Album Detail
- View album details including:
  - Tracks inside the album
  - Artist details

### ➕ Add Album
- Add a new album to the database with valid artist reference.

### ➕ Add Track
- Add a new track to the database, associated with album and artist.

---

---

## 🚀 Getting Started

### 🔧 Prerequisites
- Node.js 18+
- PostgreSQL 13+
- Chinook Database loaded into PostgreSQL

### 🖥️ Running the App

```bash
# Setup database
psql -U postgres -d chinook -f chinook.sql

# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```
Visit: http://localhost:3000

# 📑 API Documentation

API is documented using Postman, and the collection is available in the docs/ folder. You can also use Swagger (if applicable).

#📌 Notes
	•	The application is not deployed, as per requirements.
	•	Hosted on GitHub only.
	•	Chinook Database reference: Chinook GitHub Repo

 #👨‍🎓 Author
 :Ahmet Emir Arslan
