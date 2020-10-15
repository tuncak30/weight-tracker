import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBPiRfwjnndiChR0s1zUIgQVhwboP_ZlZw",
    authDomain: "weight-tracker-60eed.firebaseapp.com",
    databaseURL: "https://weight-tracker-60eed.firebaseio.com",
    projectId: "weight-tracker-60eed",
    storageBucket: "weight-tracker-60eed.appspot.com",
    messagingSenderId: "795415689954",
    appId: "1:795415689954:web:62cf3db28015a3acf2fcbb",
    measurementId: "G-5MJV7QSCMM"
})

export const auth = app.auth();
export const db = firebase.firestore(app);
export default app;