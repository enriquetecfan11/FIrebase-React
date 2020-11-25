import * as firebase from "firebase";
const config = {
  /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: "AIzaSyC9CAZEjX2ZW6b2-6rz_McsqKJjvsRyIiA",
  authDomain: "fir-60d28.firebaseapp.com",
  databaseURL: "https://fir-60d28.firebaseio.com",
  projectId: "fir-60d28",
  storageBucket: "fir-60d28.appspot.com",
  messagingSenderId: "513093619455",
  appId: "1:513093619455:web:be5c61c1943fa390e906ca",
  measurementId: "G-CJTHSCB1D2"
};

export default firebase.initializeApp(config);

const google_provider = new firebase.auth.GoogleAuthProvider();
const fb_provider = new firebase.auth.FacebookAuthProvider();
const twitter_provider = new firebase.auth.TwitterAuthProvider();
const github_provider = new firebase.auth.GithubAuthProvider();

export { google_provider, fb_provider, twitter_provider, github_provider };
