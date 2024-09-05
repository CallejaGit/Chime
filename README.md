# Set up

1. npm install in the root and frontend directory
```
\> npm install
\frontend> npm install
```
2. Set up the database
   
Prisma is an open-source ORM (Object-Relational Mapping) tool that simplifies database access for Node.js and TypeScript applications. Neon.tech is a cloud-native serverless PostgreSQL service. The Prisma Client connects to the Neon PostgreSQL database, allowing you to perform operations like reading, writing, and updating data.
* Create an account on neon.tech and Project
* On the Project Dashboard - select the Connection string drop down and select Prisma
* Select .env
* Copy the `DATABASE_URL="...`
* Create a `.env` file on the root directory and paste the `DATABASE_URL="`
* run `\backend> px prisma db push`

3. .env
* with `.env` file created on the root, add this to the file:
  ```
  JWT_SECRET=mysecretkey
  NODE_ENV=development
  PORT=5000
  ```

## Quickstart
run on different terminals:
```
\> npm run dev
\frontend> npm run dev
``` 
