

## Getting Started

Follow the steps below to set up and run the application on your local machine:

### Prerequisites

- Ensure you have Node.js installed on your system.
- Install `npm` or `yarn` (comes with Node.js).

### Installation and Setup

1. **Open two terminal windows**:

   - Navigate to the `frontend` directory in one terminal:
     ```bash
     cd frontend
     ```
   - Navigate to the `backend` directory in the other terminal:
     ```bash
     cd backend
     ```

2. **Install dependencies**:

   - In both `frontend` and `backend` directories, run:
     ```bash
     npm install
     ```

3. **Create a `.env` file in the `backend` directory**:

   - Add the following environment variables:
     ```env
     DATABASE_URL=your-database-url
     JWT_SECRET=your-jwt-secret
     ```
   - Replace `your-database-url` and `your-jwt-secret` with appropriate values.

4. **Run the application**:

   - In both terminals, execute the following command to start the development servers:
     ```bash
     npm run dev
     ```

### Additional Notes

- The backend development server runs on `http://localhost:3000`.
- The frontend development server runs on `http://localhost:5173/`.
- Ensure your database is running and accessible before starting the backend.

Feel free to modify or extend this setup based on your specific requirements.

