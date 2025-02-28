# Contact Management App

This repository contains a Contact Management application built with React (frontend) and NestJS (backend). The application consists of two main folders:

- `client`: Contains the React frontend code.
- `server`: Contains the NestJS backend code.

## Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) (v7 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v13 or higher)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/rahman778/contact-management-app.git
cd contact-management-app
```

### 2. Set Up the Environment Variables

1. Navigate to the `server` folder.
2. Copy the `.env.example` file and rename it to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your specific database configurations if required.

The default `.env` variables are:
```env
PORT=3000

DATABASE_CONNECTION=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=admin
DATABASE_DB_NAME=contact_management

CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies

#### For Backend (NestJS)
Navigate to the `server` folder and run:
```bash
npm install
```

#### For Frontend (React)
Navigate to the `client` folder and run:
```bash
npm install
```

### 4. Run Database Migrations and Seeding

Navigate to the `server` folder and execute the following commands:

#### Run Migrations
```bash
npm run migrate:run
```

#### Seed the Database
```bash
npm run seed:run
```

### 5. Start the Application

#### Start the Backend (NestJS)
Inside the `server` folder:
```bash
npm run start:dev
```
This starts the backend server on the port specified in the `.env` file (default: `3000`).

#### Start the Frontend (React)
Inside the `client` folder:
```bash
npm run dev
```
This starts the frontend development server on `http://localhost:5173`.

---

## Usage

1. Open your browser and navigate to the frontend URL (default: `http://localhost:5173`).
2. Use the application to manage your contacts by adding, updating, and deleting entries.

---

## Additional Commands

### Backend (NestJS)
- **Run Migrations**: `npm run migrate:run`
- **Seed Database**: `npm run seed:run`
- **Start Development Server**: `npm run start:dev`
- **Build for Production**: `npm run build`

### Frontend (React)
- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`

---

## Folder Structure

```
.
├── client       # React frontend code
├── server       # NestJS backend code
├── README.md    # Setup guide and project information
```

---


