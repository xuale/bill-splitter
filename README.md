# Split.io
an end-to-end solution for your bill splitting needs

## Installation
Run `npm install` for initial set-up

## Running locally
Run `npm start` to start the server on port 3000

## Directory structure

We mount all of our containers onto `src/App.js`

Containers are found in `src/containers`, each one being a React component that handles business logic.

We use Firebase and localStorage to keep track of persistent and session-based storage. Firebase interfacing services are found in `src/backend/services`.