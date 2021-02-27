import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCuWJlMcNxQV21Pkbp7WGge-lq32KOf_2g",
    authDomain: "acm-demo-fa3ab.firebaseapp.com",
    databaseURL: "https://acm-demo-fa3ab-default-rtdb.firebaseio.com/",
    projectId: "acm-demo-fa3ab",
    storageBucket: "acm-demo-fa3ab.appspot.com",
    messagingSenderId: "153226915088",
    appId: "1:153226915088:web:f3c1d48f6d86e4b5c08995"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
