import React, { useEffect, useState } from "react";
import firebase from "./firebase";
import Upload from "./Upload";
export const SignIn = () => {
	const [login, setLogin] = useState(false);
	const [userInfo, setUserInfo] = useState();
	const provider = new firebase.auth.GoogleAuthProvider();

	const loginBtn = () => {
		firebase
			.auth()
			.signInWithPopup(provider)
			.then(function (result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				// var token = result.credential.accessToken;
				// The signed-in user info.
				// var user = result.user;
				// ...
			})
			.catch(function (error) {
				console.log(error);
			});
	};
	const logOutBtn = () => {
		firebase
			.auth()
			.signOut()
			.then(function () {
				// Sign-out successful.
			})
			.catch(function (error) {
				// An error happened.
			});
		setLogin(false);
	};
	useEffect(() => {
		firebase.auth().onAuthStateChanged(function (user) {
			if (user) {
				setLogin(true);
				console.log("yes");
				const name = user.displayName;
				const photoUrl = user.photoURL;
				console.log(name);

				// User is signed in.
			} else {
				setLogin(false);
				console.log("nope");
				// No user is signed in.
			}
		});
	});
	return (
		<div>
			{login === false ? (
				<button type="button" className="btn" onClick={loginBtn}>
					Login With Google
				</button>
			) : (
				<>
					<div>
						<button type="button" className="btn" onClick={logOutBtn}>
							Logout
						</button>
						<Upload />
					</div>
				</>
			)}
		</div>
	);
};
