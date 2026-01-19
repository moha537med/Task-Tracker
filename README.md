# 📝 Tasks Tracker  (Frontend + Backend)

A simple **Tasks Tracker application** built with **Vanilla JavaScript**, **HTML**, **CSS** for the frontend, and **Node.js + Express** for the backend. This app allows users to manage tasks efficiently with features like **adding, updating, filtering, and sorting tasks**. Tasks are stored in a **JSON file**, making it lightweight and easy to run locally.

## Project Structure
TASKs-TRACKER/
├── backend/ # Node.js backend
│ ├── app.js
│ ├── tasks.json
│ └── package.json
├── frontend/ # HTML, CSS, JS frontend
│ ├── index.html
│ ├── style.css
│ └── main.js
└── README.md


## Features
- Add new tasks with **title** and **priority**.
- Toggle task status between **pending** and **done**.
- **Filter tasks** by status (all / pending / done).
- **Sort tasks** by priority or creation date.
- Responsive design for desktop and mobile.
- Real-time updates using **Fetch API**.

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Data Storage:** JSON file (`tasks.json`)
- **Other:** CORS enabled for frontend-backend communication

## How to Run

### Backend
```bash
cd backend
npm install
node server.js
The server will run at: http://localhost:3000

Frontend
Open frontend/index.html in your browser. The frontend communicates with the backend automatically.


Usage

Add a task by entering the title and priority, then click Add Task.

Click on a task to toggle its status between pending and done.

Use the filter buttons to view all/pending/done tasks.

Use the sort dropdown to order tasks by priority or creation date.

