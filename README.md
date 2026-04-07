# BubbleTalk

BubbleTalk is a real-time messaging application. This project is a monorepo containing both the frontend and backend.

## Project Structure

- `frontend/`: React application powered by Vite.
- `backend/`: Node.js server with Express.
- `package/common/`: Shared packages or utilities.

## Prerequisites

- Node.js (Latest LTS recommended)
- PostgreSQL (for backend database)

## Getting Started

### Installation

1. Clone the repository.
2. Install dependencies for the entire project from the root directory:
   ```bash
   npm install
   ```

### Configuration

#### Backend

1. Navigate to the `backend` directory.
2. Create a `.env` file based on the `.env.example` file:
   ```bash
   cp .env.example .env
   ```
3. Update the `.env` file with your database credentials.

### Running the Application

#### Backend

1. Navigate to the `backend` directory.
2. Start the server:
   ```bash
   npm run dev
   ```

#### Frontend

1. Navigate to the `frontend` directory.
2. Start the development server:
   ```bash
   npm run dev
   ```

## License

MIT
