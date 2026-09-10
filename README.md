# AIBolit

A React Native (Expo) first-aid and symptom companion app. Pick your symptoms
from a searchable list, chat in the assistant tab, and manage your profile.
Accounts and profile data are backed by Firebase Auth and Realtime Database.

## Running it

You need [Expo Go](https://expo.dev/go) on the device you want to run it on.

```bash
npm install
npm start
```

Then scan the QR code with Expo Go.

## Firebase configuration

`app/firebase.js` ships with an empty `firebaseConfig`. Fill it in with the
web app config from your own Firebase project (Project settings -> Your apps)
before running:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  databaseURL: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "...",
};
```

Without it `getAuth()` throws `auth/invalid-api-key` at startup and the app
renders a blank screen. Enable Email/Password sign-in and the Realtime
Database in that project as well.
