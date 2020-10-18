import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVbD-P1wT42sErkIpYYoz9_b3bPNfxnx8",
    authDomain: "mobile-lab-1.firebaseapp.com",
    databaseURL: "https://mobile-lab-1.firebaseio.com",
    projectId: "mobile-lab-1",
    storageBucket: "mobile-lab-1.appspot.com",
    messagingSenderId: "837900146916",
    appId: "1:837900146916:web:0ee9980c94b8ce22cf34f1",
    measurementId: "G-D7BGEMX9QJ"
};

firebase.initializeApp(firebaseConfig);

export default firebase;