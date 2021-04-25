import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../config";

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const analytics = firebase.analytics;