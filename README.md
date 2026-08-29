# 🎓 College Discovery & Comparison Platform

A full-stack web application designed to help students discover, search, filter, explore, and compare colleges based on important factors such as fees, location, ratings, and placement percentage.

The platform provides detailed information about colleges including courses offered, complete address, official website, placement rate, and fees.

---

## 🌐 Live Demo

**Frontend:**  
https://college-discovery-platform-steel.vercel.app

**Backend API:**  
https://college-discovery-api-ffm0.onrender.com

---

## ✨ Features

- 🎓 Browse colleges
- 🔍 Search colleges by name
- 📍 Filter colleges by location
- 💰 Filter by maximum fees
- ⭐ Filter by minimum rating
- 📊 Filter by placement percentage
- ↕️ Sort colleges based on different criteria
- 🏫 View detailed information about each college
- 📚 View courses offered
- 📍 View complete college address
- 🗺️ Open college location in Google Maps
- 🌐 Visit official college website
- ⚖️ Compare multiple colleges
- ✅ Select up to 3 colleges for comparison
- 📄 Pagination support
- 📱 Responsive user interface
- ☁️ Fully deployed full-stack application

---

## 🛠️ Technology Stack

### Frontend

- Next.js
- React.js
- TypeScript
- Tailwind CSS

### Backend

- Node.js
- Express.js
- REST API

### Database

- PostgreSQL
- Neon PostgreSQL

### Deployment

- Vercel - Frontend Deployment
- Render - Backend Deployment
- Neon - Cloud PostgreSQL Database

### Version Control

- Git
- GitHub

---

## 🏗️ System Architecture

```text
                 USER
                   │
                   ▼
        ┌─────────────────────┐
        │   Next.js Frontend  │
        │       Vercel        │
        └──────────┬──────────┘
                   │
               REST API
                   │
                   ▼
        ┌─────────────────────┐
        │  Node.js + Express  │
        │       Render        │
        └──────────┬──────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │     PostgreSQL      │
        │        Neon         │
        └─────────────────────┘
```

---

## 📂 Project Structure

```text
college-placement/
│
├── backend/
│   ├── src/
│   │   ├── db/
│   │   │   └── db.js
│   │   └── index.js
│   │
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── app/
│   │   ├── college/
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   │
│   │   ├── colleges/
│   │   │   └── page.tsx
│   │   │
│   │   ├── compare/
│   │   │   └── page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   └── page.tsx
│   │
│   ├── public/
│   ├── package.json
│   └── next.config.ts
│
└── README.md
```

---

## 🔗 API Endpoints

### Get All Colleges

```http
GET /colleges
```

Supports pagination, searching, filtering, and sorting.

Example:

```http
GET /colleges?page=1&limit=10
```

---

### Get College By ID

```http
GET /colleges/:id
```

Example:

```http
GET /colleges/1
```

This endpoint returns detailed information about a particular college.

---

## 🔍 Search & Filtering

Users can search and filter colleges using:

- College Name
- Location
- Maximum Fees
- Minimum Rating
- Minimum Placement Percentage

The platform also supports sorting colleges according to different criteria.

---

## ⚖️ College Comparison

Users can select multiple colleges and compare them side-by-side.

The comparison includes:

- College Name
- Location
- Fees
- Rating
- Placement Percentage

A maximum of **3 colleges** can be selected for comparison.

---

## 🏫 College Details

Clicking on a college card opens a dedicated details page containing:

- College Name
- Location
- Fees
- Rating
- Placement Percentage
- Complete Address
- Courses Offered
- College Description
- Official Website
- Google Maps Location

---

## 🚀 Running the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/nutan23/college-discovery-platform.git
```

Move into the project:

```bash
cd college-discovery-platform
```

---

## ⚙️ Backend Setup

Move to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your PostgreSQL database configuration.

Example:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:5000
```

---

## 💻 Frontend Setup

Open another terminal and move to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## ☁️ Deployment Architecture

The application is deployed using three cloud services:

### Vercel

Hosts the Next.js frontend.

### Render

Hosts the Node.js and Express backend REST API.

### Neon

Provides the cloud-hosted PostgreSQL database.

The production communication flow is:

```text
Vercel Frontend
       ↓
Render REST API
       ↓
Neon PostgreSQL
```

---

## 🔐 Security

- Sensitive database credentials are stored using environment variables.
- `.env` files are excluded from Git using `.gitignore`.
- Database credentials are not stored directly in the public repository.

---

## 🎯 Purpose of the Project

Choosing a college requires students to compare multiple factors such as fees, placement opportunities, location, courses, and ratings.

This project provides a single platform where students can discover colleges, apply filters, view detailed information, and compare colleges before making a decision.

---

## 🔮 Future Enhancements

Future versions of the platform can include:

- 👤 Student Login and Registration
- ❤️ Favorite / Saved Colleges
- 🤖 AI-based College Recommendations
- 🎯 Personalized recommendations based on student preferences
- 📈 Placement statistics and charts
- 💬 Student reviews
- 🏆 College ranking system
- 📅 Admission deadline information
- 🔔 Admission notifications
- 🎓 Course-based college recommendations

---

## 👩‍💻 Developer

**Nutan Salunkhe**

Computer Engineering Student

GitHub:  
https://github.com/nutan23

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.