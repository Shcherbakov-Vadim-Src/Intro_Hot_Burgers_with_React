import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseApp =  firebase.initializeApp({
    apiKey: "AIzaSyBc2-1kAIZrg7xYMZTbwsjlNphkVrkOpRk",
    authDomain: "very-hot-burgers-e4d68.firebaseapp.com",
    databaseURL: "https://very-hot-burgers-e4d68-default-rtdb.europe-west1.firebasedatabase.app",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };
export default base;