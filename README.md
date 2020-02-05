# Hapi App UI
This is a base Hapi.js UI application for Node.js using Handlebars for server side and client side to consume APIs from other applications.

## Assumptions
#### Important
- Node 8 installed
- NPM installed

#### Code Quality
- IDE has plugins installed for jshint, eslint, editorconfig

## Stack

- **Hapi** - Server side framework
- **Handlebars** - HTML templating engine for server side and client side
- **LESS** - CSS preprocessor 
- **Gulp** - Tasks automation

Note: For a detailed list of the toolsets used, please refer to [package.json](package.json). 

## Application Structure

```
| -- server
|    |-- app
|        |-- handlers       // All application handlers
|        |-- methods        // All application methods
|        |-- routes         // All application routes
|        |-- views          // All server-rendered handlebar templates, partials and helpers
|        |   |-- helpers    // Handlebar helpers
|        |   |-- partials   // Handlebar partials
|        |   |-- templates  // Handlebar templates
|        |-- index.js       // Application starting point
|
|    |-- app-services
|    |   |-- index.js       // Setup for services consumed
|   
|-- client                  // Contains all front end resources that gulp will compile to /dist folder
|   |-- js                  // Client javscript files
|   |-- less                // All LESS stylesheets
|   |-- templates           // All client-rendered handlebar templates and partials
|   
|-- tests                   // Unit tests
|
|-- build.json              // Build configuration for Gulp tasks
|-- gulpfile.js             // Gulp tasks file 
|-- index.js                // Application starting point
|-- manifest.js             // App manifest file listing all plugins, global settings and variables
|-- package.json            // Package configuration file
|-- server.js               // Main server file
```

## Running the server locally

 - Install  `node`, `npm`
 - Run these commands

```sh
# Install dependencies
$ npm install

# Generate client assets
$ npm run gulp

# Run the node server
$ npm start

# Run the node server in dev mode (gulp watching js,less,templates and nodemon watching server changes)
$ npm run dev

```
The server should be running at [localhost:3000](https://localhost:3000).

## Running tests
Lab is part of the hapi.js toolset and used to write all of our tests.

```
$ npm test          // runs lab tests in console for passing/failing/coverage/etc
$ npm run coverage  // runs lab tests while creating and opening a coverage.html file

```