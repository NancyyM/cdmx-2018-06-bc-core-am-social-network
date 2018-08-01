const usuario = document.getElementById('userRegistered');
const clave = document.getElementById('passwordRegistered');
const btn = document.getElementById('login');
const btngoogle = document.getElementById('btngoogle');
const btnfacebook = document.getElementById('btnfacebook');


validateEmail = (userRegistered) => {
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(userRegistered) ? true : false;
};


firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    window.location.assign('views/view1.html');
  } else {
    console.log('Aun no se ha accesado con ninguna cuenta');
  }
});


// INICIAR SESION
btn.addEventListener('click', e => {
  const mail1 = usuario.value;
  const cl1 = clave.value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(mail1, cl1);
  promise.then(function(){
    location.href="../src/views/view1.html";
  }).catch(error => {
  let prub = userRegistered.value;
  alert("email no reconocido");
} );
});


// INGRESAR CON GOOGLE Y CON FACEBOOK
btngoogle.addEventListener('click', e =>{
  var provider = new firebase.auth.GoogleAuthProvider();
  autentificate(provider);
});

btnfacebook.addEventListener('click', e =>{
  var provider = new firebase.auth.FacebookAuthProvider();
  autentificate(provider);
});

const autentificate = (provider) => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  // ...
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
