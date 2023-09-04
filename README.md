# ExpressoGo - Your Express.js Project Initialization Tool

![ExpressoGo Logo](https://github.com/AyubAhmed0/expressogo/raw/95c6e1c5c9aaeec245aaabe261e159b8ed438adb/expressoGoLogo.png)

ExpressoGo is a command-line tool that simplifies the process of creating a new Express.js project. With ExpressoGo, you can quickly generate the basic structure for your Express.js application, including CRUD route files, middleware setup, and common npm package installation.

## Features

- **Express.js Project Initialization:** Create a new Express.js project with just a few simple commands.
- **CRUD Route Files:** Automatically generate CRUD route files for creating, reading, updating, and deleting items.
- **Middleware Setup:** Set up commonly used Express.js middleware for JSON parsing, URL encoding, logging, and more.
- **Common npm Packages:** Install essential npm packages commonly used in Express.js projects.
- **Development Environment:** Use Nodemon for development to auto-restart the server during code changes.

## Installation

You can install ExpressoGo globally using npm:

```bash
npm install -g expressogo
```

Usage

To initialize a new Express.js project using ExpressoGo, follow these steps:

1. Run the following command to start 
```bash
expressogo
```
2. Follow the prompts to customize your Express.js project, such as choosing the Express.js version.
3. ExpressoGo will create a new project directory with the basic structure and files needed for your Express.js application.
4. After initialization, navigate to the project directory and run the development server using:

```bash
npm run dev
```
5. Your Express.js application will be running at http://localhost:3000. You can start building your routes and logic from there.

Project Structure

The generated project structure will look like this:

your-express-app/
│
├── app.js
├── package.json
├── routes/
│   ├── createRoute.js
│   ├── readRoute.js
│   ├── updateRoute.js
│   └── deleteRoute.js
│
├── node_modules/
└── ...other files and directories

Contributing

Contributions are welcome! If you have any ideas, suggestions, or improvements for ExpressoGo, please open an issue or create a pull request.

License

This project is licensed under the [MIT License](http://opensource.org/licenses/MIT)