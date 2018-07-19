// Initialize Firebase

var config = {
  apiKey: "AIzaSyCihx2_wwaHazrySwOO0LLmdBCWtfZgoek",
  authDomain: "login-35451.firebaseapp.com",
  databaseURL: "https://login-35451.firebaseio.com",
  projectId: "login-35451",
  storageBucket: "login-35451.appspot.com",
  messagingSenderId: "276377229885"
};
firebase.initializeApp(config);

const usuario = document.getElementById('user');
const clave = document.getElementById('password');
const btn = document.getElementById('cuenta');

// console.log(usuario);

btn.addEventListener('click', e =>{
const email = usuario.value;
// console.log(email);
const cl = clave.value;
// console.log(cl);
const auth = firebase.auth();

const promise = auth.createUserWithEmailAndPassword(email, cl);
promise.catch(e => console.log(e.message));

});
