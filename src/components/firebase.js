import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyCJzJ7NxlV1FjOrorJtrtcqdecCrBvcE5M",
	authDomain: "pickly-auth.firebaseapp.com",
	databaseURL: "https://pickly-auth.firebaseio.com",
	projectId: "pickly-auth",
	storageBucket: "pickly-auth.appspot.com",
	messagingSenderId: "654120244273",
	appId: "1:654120244273:web:d8885cfb2f26abe67fb110",
};
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;
