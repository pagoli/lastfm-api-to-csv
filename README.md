# How to retrieve artist's information via last.fm API

A simple Node.js REST API to get data from artist search, saved into a lightweight CSV file.

## Instructions

### 1 - Installation

Install dependencies

```js
npm install
```

### 2 - API-KEY

Please create a .env-file in your root folder.
You can get a free [API-KEY](https://www.last.fm/api/ "API-KEY") after registration.

```js
//.env
API_KEY = 1234567810
```

### 3 - Running the app

```js
npm start
```

### 4 - Searching an artist

In order to search for an artist, please use Postman or any similar software to access the backend.

To search for an artist, go to:
http://localhost:5000/artist/:artistName

### 5 - Your search will be stored in the search folder

## System Requirements

Please make sure to use node version **19.0.0 or higher** [-> Link](https://nodejs.org/en/download/)
as well as npm version **8.19.2** .

#### Feel free to use this app for your purpose.