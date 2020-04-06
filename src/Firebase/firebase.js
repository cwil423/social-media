import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

export const fb = firebase.initializeApp({
  apiKey: "AIzaSyABfHXqmT18idGJLOmr4w6Lm0t-kaWps6c",
  authDomain: "social-media-d03f3.firebaseapp.com",
  databaseURL: "https://social-media-d03f3.firebaseio.com",
  projectId: "social-media-d03f3",
  storageBucket: "social-media-d03f3.appspot.com",
  messagingSenderId: "240876095659",
  appId: "1:240876095659:web:59f5fcbe46eb0f8d444fee",
  measurementId: "G-ZWMYR9HBZ7"
});
