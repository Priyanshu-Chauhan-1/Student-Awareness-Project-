# Student-Awareness-Project-
Student Awareness Portal — a full-stack web Student Awareness Portal — a full-stack web app (Spring Boot + React/Vite + Ant Design) for managing student information and showcasing government schemes/awareness resources with REST APIs and a responsive dashboard.


## Project Progress Summary (Day 1 to Day 3)

### Day 1 — Backend Setup (Spring Boot)
- Initialized the **Spring Boot** backend project.
- Created and tested a basic health-check endpoint:
  - **GET `/health`** → returns `OK`
- Verified the backend runs successfully on:
  - `http://localhost:8080`

**Outcome:** Backend server is running and ready for API development.

---

### Day 2 — Frontend Setup (React + Vite) + Backend Connectivity
- Created the **React** frontend using **Vite**.
- Configured a Vite development proxy to avoid CORS and simplify API calls:

  - `/api` → `http://localhost:8080`
  - `/health` → `http://localhost:8080`

- Connected frontend to backend by calling:
  - `fetch("/health")` (via proxy)
- Confirmed integration when UI showed:
  - **Backend health: OK**

**Outcome:** Frontend runs on `http://localhost:5173` and successfully communicates with the backend.

---

### Day 3 — Student CRUD (Backend API + Frontend UI)
#### Backend (Spring Boot)
- Implemented **Student CRUD** functionality:
  - Created `Student` entity mapped to the `students` database table with fields:
    - `id`, `name`, `email (unique)`, `department`, `year`
  - Added `StudentRepository` (JPA) for database operations.
  - Added `StudentController` REST endpoints:
    - **GET `/api/students`** → list all students
    - **POST `/api/students`** → create a new student
    - **DELETE `/api/students/{id}`** → delete student by id
- Verified `GET /api/students` returns `[]` when the table is empty.

#### Frontend (React)
- Built a **Students page** that performs:
  - Fetch & display students list from **GET `/api/students`**
  - Add student via form using **POST `/api/students`**
  - Delete student using **DELETE `/api/students/{id}`**
- Used proxy-based API calls (`/api/...`) instead of hardcoding `http://localhost:8080`.

**Outcome:** A complete full-stack Student module is working end-to-end (UI ↔ API ↔ Database).

---

## Running the Project
### Backend
- Runs on: `http://localhost:8080`
- Start command:
  ```bash
  mvn spring-boot:run
  ```

### Frontend
- Runs on: `http://localhost:5173`
- Start command:
  ```bash
  npm run dev
  ```

---