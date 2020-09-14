import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyDhmPqmPx4fzdv9ubjpRnu-cWMt7PMxxlk",
    authDomain: "performanceprogram-55f54.firebaseapp.com",
    databaseURL: "https://performanceprogram-55f54.firebaseio.com",
    projectId: "performanceprogram-55f54",
    storageBucket: "performanceprogram-55f54.appspot.com",
    messagingSenderId: "1046536887777",
    appId: "1:1046536887777:web:00f9f67dace4879ce4c6a0"
};



firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
  };
export const auth = firebase.auth();
export const firestore = firebase.firestore();