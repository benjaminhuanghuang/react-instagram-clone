import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAFfr2BftxE1shIN6S6M0_PU3YWY5em2uY",
  authDomain: "instgram-clone-fc318.firebaseapp.com",
  databaseURL: "https://instgram-clone-fc318.firebaseio.com",
  projectId: "instgram-clone-fc318",
  storageBucket: "instgram-clone-fc318.appspot.com",
  messagingSenderId: "1041236632664",
  appId: "1:1041236632664:web:feb9b62047c0535d0a962d",
  measurementId: "G-E2J2BGPGTF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

export { db, auth, storage };
