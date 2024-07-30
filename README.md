# Gateway API for handling MarketApp client requests

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">This is a gateway API for handling MarketApp client requests. It is built with <a href="http://nestjs.com" target="blank">NestJS</a> and <a href="https://www.typescriptlang.org/" target="blank">Typescript</a>.</p>

## Developer Settings

To configure and run this project in your local environment, follow these steps:

1. **Clone the repository** to your local machine:

   ```bash
   git clone <REPOSITORY_URL>
   ```

2. **Navigate to the project directory**:

   ```bash
   cd <PROJECT_DIRECTORY>
   ```

3. **Install dependencies** using npm:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project. You can refer to the included `.env.template` file. Make sure you fill out all the required variables.

5. **Run the application**:

   ```bash
   npm run start:dev
   ```

## Swagger Documentation

The API documentation can be accessed at `http://${HOST}:${PORT}/api/docs`. This is a Swagger documentation that provides information about the API endpoints and how to use them.

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Nats**: A lightweight and highly performant messaging system that is used for communication between services.
- **Docker**: A platform for developing, shipping, and running applications in containers.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **MongoDB**: A general-purpose, document-based, distributed database built for modern application developers and for the cloud era.
- **Prisma**: A modern database toolkit that makes it easy to work with databases in Node.js and TypeScript.
- **JWT**: A standard for access tokens that allows you to verify the identity of the user.
- **Passport**: An authentication middleware for Node.js that is extremely flexible and modular.
- **Swagger**: A tool that helps you design, build, document, and consume RESTful web services.
