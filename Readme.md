# Magic Transporters API - README

Welcome to the **Magic Transporters API**! Dive into the future of logistics with our cutting-edge transporters that utilize virtual magic to move things easily and efficiently.

## Task Description
- In the world of Magic Transporters, there are special people known as Magic
Movers. They use nifty gadgets to move important things. Fueled by virtual magic,
these Movers go on quick missions to carry items around.

1. A Magic Mover has:
- Weight limit (the most they can carry);
- Energy (their total magic power);
- Quest state (what they’re currently doing: resting, loading, on a mission, or
done).

2. Each Magic Item they carry has:
- Name (what it’s called);
- Weight (how much magic power it needs);

3. Develop a REST API to:
- add a Magic Mover;
- add a Magic Item;
- Load a Magic Mover with items, creating a log of this activitiy (loading state);
- Start a Mission — update the Magic Mover’s state to on a mission and stop loading more, creating a log of this activitiy (on a mission);
- End a Mission — unload everything from the Magic Mover, creating a log of this activitiy (mission complete / done);
-Check who completed the most missions with a simple list.

## Requirements
Follow these simple rules:
1. Functional requirements:
- Don’t give Magic Movers too much to carry for efficiency;
- Make a simple list showing who completed the most missions.

2. Non-functional requirements:
- Make sure the project is easy to build and run;
- Set up any needed data before starting (like starting a video game);
- Use express in Node.js or nestjs framework.
- Use Typescript

## Postman Collection
For testing the API, you can download the Postman collection using the link below:

[Download Magic Transporters API POSTMAN Collection](https://github.com/somarkn99/magic-transporters/blob/main/Magic%20Transporters%20API%20POSTMAN%20Collection.json)
## Getting Started

This guide will help you set up and run the Magic Transporters API on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- Node.js (v14.21.2)
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