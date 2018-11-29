import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDZjFuL-G_kTkrQR8qFt0UyxaSIO9Wb0oI',
  authDomain: 'splitio-6c3eb.firebaseapp.com',
  databaseURL: 'https://splitio-6c3eb.firebaseio.com',
  projectId: 'splitio-6c3eb',
  storageBucket: 'splitio-6c3eb.appspot.com',
  messagingSenderId: '924837398418'
};

firebase.initializeApp(config);

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const ts = firebase.database.ServerValue.TIMESTAMP;

export { db, ts };
