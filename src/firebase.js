
import firebase from 'firebase/app';
import 'firebase/auth'; 


export const auth = firebase.initializeApp( {
    apiKey: "AIzaSyDgNLextrzrty6q-DvOM0zrg7KVLbbzaQk",
    authDomain: "unichat-10389.firebaseapp.com",
    projectId: "unichat-10389",
    storageBucket: "unichat-10389.appspot.com",
    messagingSenderId: "516833418520",
    appId: "1:516833418520:web:90dbb2a716dc09dde5126d"
  }).auth(); 