# Magic Transporters API - README

Welcome to the **Magic Transporters API**! Dive into the future of logistics with our cutting-edge transporters that utilize virtual magic to move things easily and efficiently.

## Getting Started

This guide will help you set up and run the Magic Transporters API on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (LTS Version)
- npm (Node Package Manager)
- MongoDB (Local or remote instance for database connectivity)

### Installation

1. **Extract The file**

2. **Navigate to the project directory**

   Change into the project directory:
   ```
   cd magic-transporters
   ```

3. **Install dependencies**

   Run the following command to install the necessary dependencies:
   ```
   npm install
   ```

4. **Set up environment variables**

   Create a `.env` file in the root directory and add the following environment variables according to your setup:
   ```
   PORT=3000
   DB_URI=mongodb://localhost:27017/magicTransporters
   ```

### Building the Project

To build the TypeScript files to JavaScript, run the following command:
```
npm run build
```

This will compile the TypeScript files in the `src` directory and output the JavaScript files to the `dist` directory.

### Running the Project

After building the project, you can run it using:
```
npm start
```

For development, you might want to run the project with hot reloading. Use:
```
npm run start:dev
```
This will start the server using `nodemon` and `ts-node`, and it will automatically restart whenever you make changes to the source files.

## Features

Here’s a quick rundown of the key features of the Magic Transporters API:

- **Modular Architecture**: Clean separation into routes, controllers, models, and services.
- **Database Connection**: Robust MongoDB integration with error handling.
- **Advanced Logging**: Uses Winston for multi-level logging.
- **Environment Variables**: Managed via dotenv for security.
- **Rate Limiting**: Protection against DDoS with express-rate-limit.
- **CORS**: Configured to handle resources sharing across domains.
- **Error Handling**: Centralized error management for consistency.
- **Data Validation**: Enforced by Mongoose schemas with pre-save hooks.