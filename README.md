# Argent Bank App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Back-end API

This project uses an API served by a Node.js server. The source code for the server can be found [here](https://github.com/JohanPeraldi/OC_DAJR_13_Bank_API). Make sure to follow the instructions in the README file of the API project to set up the server.

## Environment variable

To run this project, you will need to rename the `.env.example` file to `.env` in order for the environment variable to be loaded. The `.env` file should contain the following environment variable:

- REACT_APP_BASE_URL
  > The value of this variable should be the base url of the API you are using. By default, the back-end server is running on localhost:3001, so the `.env` file should contain the following line:
  >
  > `REACT_APP_BASE_URL='http://localhost:3001/api/v1'`
