  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAw5cZOgGoVoog9prX44MlN1415wt-sYgs",
    authDomain: "socialnetwork-lab.firebaseapp.com",
    databaseURL: "https://socialnetwork-lab.firebaseio.com",
    projectId: "socialnetwork-lab",
    storageBucket: "",
    messagingSenderId: "535657697568"
  };
  firebase.initializeApp(config);

  $('#buttonGoogle').click(function () {
    authGoogle();
  });

  function authGoogle() {
    var provider = new firebase.auth.GoogleAuthProvider();
    authentication(provider);
  }

  function authentication(provider) {
    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      console.log(result);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      console.log('errorCode');
      var errorMessage = error.message;
      console.log('errorMessage');
      // The email of the user's account used.
      var email = error.email;
      console.log('email');
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log('credential');
      // ...
    });
  }