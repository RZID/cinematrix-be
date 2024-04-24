# Cinematrix

Cinematrix is a backend API application developed with NestJS, catering to the needs of the LKS Web Design JU 1 project. This project aims to provide a comprehensive backend solution for managing movies, user authentication, and user profiles.

## Features

- **Movie Management**: Cinematrix allows users to manage movies by providing endpoints for creating, updating, retrieving, and deleting movie details. Users can store information such as title, description, rating, release date, and media content associated with each movie.
- **User Authentication**: Secure user authentication is implemented using JWT Passport, providing authentication middleware for Node.js. Users can register, log in, and retrieve their profile information. Access to certain endpoints is restricted based on user roles.
- **User Profile Management**: Users can update their profile information. Profile updates are authenticated and authorized using JWT tokens.

## Technologies Used

- **NestJS**: Cinematrix is built on top of the NestJS framework, providing a robust and scalable foundation for building backend applications with TypeScript.
- **Prisma**: The application utilizes Prisma for seamless integration with various databases, allowing easy management of database entities and relationships.
- **JWT Passport**: User authentication is implemented using JWT Passport, providing flexible authentication strategies for Node.js applications.

## Getting Started

To get started with Cinematrix, follow these steps:

1. Clone this repository
2. Install Dependencies
   ```bash
   cd cinematrix-be
   npm install # pnpm install | yarn add
   ```
3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the .env file with your database connection details and any other necessary configuration.
4. Run the migration:
   ```bash
   npx prisma migrate dev
   ```
5. Run the application:
   ```bash
   npm start # start:dev | start:prod | start:debug
   ```
   The application should now be running locally on port 3000 by default.

## Contributing

Contributions to Cinematrix are welcome! If you encounter any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
