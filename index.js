#!/usr/bin/env node

const { execSync } = require("child_process");
const inquirer = require("inquirer");
const fs = require("fs");

// Function to display custom art
function displayLogo() {
  console.log(`
  
███████╗██╗░░██╗██████╗░██████╗░███████╗░██████╗░██████╗░█████╗░░██████╗░░█████╗░
██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝░██╔══██╗
█████╗░░░╚███╔╝░██████╔╝██████╔╝█████╗░░╚█████╗░╚█████╗░██║░░██║██║░░██╗░██║░░██║
██╔══╝░░░██╔██╗░██╔═══╝░██╔══██╗██╔══╝░░░╚═══██╗░╚═══██╗██║░░██║██║░░╚██╗██║░░██║
███████╗██╔╝╚██╗██║░░░░░██║░░██║███████╗██████╔╝██████╔╝╚█████╔╝╚██████╔╝╚█████╔╝
╚══════╝╚═╝░░╚═╝╚═╝░░░░░╚═╝░░╚═╝╚══════╝╚═════╝░╚═════╝░░╚════╝░░╚═════╝░░╚════╝░
  `);
}

async function main() {
   // Display the art logo
   displayLogo();
  console.log(
    "Welcome to ExpressoGo - Your Express.js project initialization tool"
  );

  // Prompt the user for custom configurations using inquirer
  const customConfig = await inquirer.prompt([
    {
      type: "input",
      name: "expressVersion",
      message: "Enter the desired Express.js version:",
      default: "latest", // Provide a default value
    },
    // Add more prompts for other custom configurations
  ]);

  console.log("Initializing a new Express.js project...");

  // Initialise the project using npm init (customise as needed)
  execSync("npm init -y", { stdio: "inherit" });

  console.log("Installing Express.js...");

  // Install the desired Express.js version based on user input
  execSync(`npm install express@${customConfig.expressVersion}`, {
    stdio: "inherit",
  });

  // Create a 'routes' directory if it doesn't exist
  if (!fs.existsSync("routes")) {
    fs.mkdirSync("routes");
  }

  // Create CRUD route files
  console.log("Generating CRUD route files...");

  const createRouteCode = `
    const express = require('express');
    const router = express.Router();

    // Create a new item
    router.post('/', (req, res) => {
      // Implement your create logic here
      res.send('Create route: Implement your logic here');
    });

    module.exports = router;
  `;

  const readRouteCode = `
    const express = require('express');
    const router = express.Router();

    // Get all items
    router.get('/', (req, res) => {
      // Implement your read all logic here
      res.send('Read all route: Implement your logic here');
    });

    // Get an item by ID
    router.get('/:id', (req, res) => {
      // Implement your read by ID logic here
      res.send('Read by ID route: Implement your logic here');
    });

    module.exports = router;
  `;

  const updateRouteCode = `
    const express = require('express');
    const router = express.Router();

    // Update an item by ID
    router.put('/:id', (req, res) => {
      // Implement your update logic here
      res.send('Update route: Implement your logic here');
    });

    module.exports = router;
  `;

  const deleteRouteCode = `
    const express = require('express');
    const router = express.Router();

    // Delete an item by ID
    router.delete('/:id', (req, res) => {
      // Implement your delete logic here
      res.send('Delete route: Implement your logic here');
    });

    module.exports = router;
  `;

  // Write CRUD route files in the 'routes' directory
  fs.writeFileSync("./routes/createRoute.js", createRouteCode);
  fs.writeFileSync("./routes/readRoute.js", readRouteCode);
  fs.writeFileSync("./routes/updateRoute.js", updateRouteCode);
  fs.writeFileSync("./routes/deleteRoute.js", deleteRouteCode);

  console.log("CRUD route files generated!");
  // Create an Express app and set up middleware
  console.log("Setting up Express.js middleware...");

  const appCode = `
     const express = require('express');
     const app = express();
     // Import the CRUD route files at the top level
     const createRoute = require('./routes/createRoute');
     const readRoute = require('./routes/readRoute');
     const updateRoute = require('./routes/updateRoute');
     const deleteRoute = require('./routes/deleteRoute');
 
     // Commonly used middleware
     app.use(express.json()); // JSON body parser
     app.use(express.urlencoded({ extended: true })); // URL-encoded body parser
     app.use(require('morgan')('combined')); // Logging middleware
     app.use(require('cors')()); // CORS middleware

     // Start the Express.js server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Express server is listening on port ' + port);
  });

     // Use the CRUD routes in your Express app
     app.use('/create', createRoute);
     app.use('/read', readRoute);
     app.use('/update', updateRoute);
     app.use('/delete', deleteRoute);
 
     // Your routes and additional middleware can be added here
 
     module.exports = app;
   `;

  // Create an 'app.js' file with the Express app code
  fs.writeFileSync("app.js", appCode);
  // Install common npm packages for Express.js projects
  console.log("Installing common npm packages...");

  // Common npm packages for Express.js
  const commonPackages = [
    "body-parser",
    "morgan",
    "cors",
    "helmet",
    "mongoose", // For MongoDB
    "passport", // For authentication
    "jsonwebtoken", // For JWT authentication
    "express-validator", // Request validation
    "winston", // Logging
    "ejs", // EJS view engine
  ];

  execSync(`npm install ${commonPackages.join(" ")}`, { stdio: "inherit" });

  // Install packages for testing (e.g., Mocha, Chai)
  console.log("Installing dev packages...");

  // Testing packages
  const devPackages = [
    "mocha",
    "chai",
    "supertest",
    "nodemon", // Nodemon for auto-restarting the server (development dependency)
  ];

  execSync(`npm install --save-dev ${devPackages.join(" ")}`, {
    stdio: "inherit",
  });

  // Update package.json scripts
  const path = require("path");
  const packageJSONPath = path.join(process.cwd(), "package.json");
  const packageJSON = require(packageJSONPath);
  packageJSON.scripts = {
    start: "node app.js", // The script to start Express app
    dev: "nodemon app.js", // Use nodemon for development to auto-restart the server
    test: 'echo "Error: no test specified" && exit 1',
  };

  fs.writeFileSync("package.json", JSON.stringify(packageJSON, null, 2));
  console.log("Express.js project is ready!");
}

main();
