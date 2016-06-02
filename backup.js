import './index.html'
import './main.scss'

var provider = new firebase.auth.GoogleAuthProvider();
var authUser = null;

var $ = (query) => {
	var list = document.querySelectorAll(query);
	if (list.length == 1) {
		return list[0];
	}
	return list;
}

var refreshUserUI = () => {
	if (authUser) {
		$(".avatar").style.display = "block";
		$(".btn.login").style.display = "none";
		console.log('URL:', authUser.photoURL);
		$(".avatar").src = authUser.photoURL;
	} else {
		$(".avatar").style.display = "none";
		$(".btn.login").style.display = "block";
	}
}

var userLogin = () => {
	firebase.auth().signInWithPopup(provider).then(function(result) {
		// This gives you a Google Access Token. You can use it to access the Google API.
		var token = result.credential.accessToken;
		// The signed-in user info.
		var user = result.user;
		// ...
		authUser = user;
		console.log('New user: ', authUser);

		refreshUserUI();
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		// The email of the user's account used.
		var email = error.email;
		// The firebase.auth.AuthCredential type that was used.
		var credential = error.credential;
		// ...
	});
}

var userLogout = () => {
	firebase.auth().signOut().then(function() {
		// Sign-out successful.
		authUser = null;
		refreshUserUI();
	}, function(error) {
		// An error happened.
	});
}

var userAuthentication = (user) => {
	if (user == null) {

	} else {
		authUser = user;
		console.log('User logged in:', authUser);
		refreshUserUI();
	}
}

// Initalize authentication
firebase.auth().onAuthStateChanged(userAuthentication);

$(".btn.login").addEventListener("click", userLogin);
$(".btn.logout").addEventListener("click", userLogout);
