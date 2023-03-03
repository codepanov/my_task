# Getting Started with the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

First install dependencies:

### `npm i`

Then in the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is then ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

**Note: this project simulates REST call to get the data, but also has an option to use the REST API through json-server.**

To use the json-server:
- follow the comments in the Autocomplete.tsx component,
- comment out and uncomment marked code sections,
- open new terminal from the **server** folder and run the following command:

### `npx json-server --watch data.json --port 8000`


**Note: tests are done only for the simulation of REST. They do not cover axios call to REST API!**

