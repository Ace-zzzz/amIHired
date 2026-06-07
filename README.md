# amIHired

A simple job-application tracker web app with a Java (Spring Boot) backend and a Vite + React frontend.

## Overview

- Backend: Spring Boot (Maven) in `backend/`.
- Frontend: Vite + React in `frontend/`.
- Docker: `docker-compose.yml` to run both services together.

## Prerequisites

- Docker & Docker Compose (recommended)
- Java 17+ and Maven (for running backend locally)
- Node.js 16+ and npm/yarn (for running frontend locally)

## Run with Docker Compose

Build and start both services:

```bash
docker compose up --build
```

Stop and remove containers:

```bash
docker compose down
```

## Run services locally

Backend (Linux/macOS):

```bash
cd backend
./mvnw spring-boot:run
```

Backend (Windows):

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

## Configuration

Environment-specific properties live in `backend/src/main/resources/`.

## Tests

Backend unit tests can be run with:

```bash
cd backend
./mvnw test
```

Frontend tests (if any) can be run via the usual npm scripts in `frontend`.

## Contributing

Open an issue or submit a PR. Follow existing code style and include tests where appropriate.

---

If you want a more detailed README (architecture, API docs, env variables), tell me what to include and I will expand it.
