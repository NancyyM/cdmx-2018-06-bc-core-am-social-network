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


const usuario = document.getElementById('user1');
const clave = document.getElementById('password1');
const btn = document.getElementById('login');
const btnUser = document.getElementById('checkIn');
const mailCorrect = document.getElementById('emailCorrect');
const btngoogle = document.getElementById('btngoogle');
const prueba = document.getElementById('prueba');

validateEmail = (user1)=>{
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(user1) ? true : false;
};


//PARA INGRESAR CON FACEBOOK
//const authFacebook = () => {
  //var provider = new firebase.auth.FacebookAuthProvider();
  //alert("loginfacebook");
//}
 //TERMNANDO CON FACEBOOK

// BOTÓN PARA INGRESAR CON GOOGLE
btngoogle.addEventListener('click', e =>{
  entryGoogle();
})
entryGoogle = () => {
  provider = new firebase.auth.GoogleAuthProvider();
  autentificate(provider);
}
autentificate = (provider) => {
  firebase.auth().signInWithPopup(provider).then(function(result) {
    //agregar la funcion que haga la redireccion cuando la respuesta es verdadera
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(result);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
    console.log(error);
    //agregar una alerta al usuario que la contraseña o email no es correcta
  });
}




// btngoogle.addEventListener('click', e => {
//   var provider = new firebase.auth.GoogleAuthProvider();
//   validar(provider);
//   console.log(provider);
//
// });
//
//
// const validar = (provider) => {
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   var token = result.credential.accessToken;
//   // The signed-in user info.
//   var user = result.user;
//   // ...
// }).catch(function(error) {
//   // Handle Errors here.
//   var errorCode = error.code;
//   var errorMessage = error.message;
//   // The email of the user's account used.
//   var email = error.email;
//   // The firebase.auth.AuthCredential type that was used.
//   var credential = error.credential;
//   // ...
// });
// }








/* REGISTRARSE.
btnUser.addEventListener('click', e =>{
const mail = usuario.value;
const cl = clave.value;
const auth = firebase.auth();
const promise = auth.createUserWithEmailAndPassword(mail, cl);
promise.catch(e => console.log(e.message));
let prub = user1.value;
if (validateEmail(prub)){
mailCorrect.innerHTML = ('Tu correo es correcto');
}
else{
mailCorrect.innerHTML =  ('Ingrese un correo valido por favor');
}

});
*/

// INICIAR SESION.
// btn.addEventListener('click', e =>{
//   const mail1 = usuario.value;
//   const cl1 = clave.value;
//   const auth = firebase.auth();
//   const promise = auth.signInWithEmailAndPassword(mail1, cl1);
//   promise.then(function(){
//     location.href="../views/view1.html";
//   }).catch(error => {
//     let prub = user1.value;
//     alert("email no reconocido");
    // if (validateEmail(prub)){
    //        alert('Tu correo es correcto');
    //      }
    // else{
    //   alert('Ingrese un correo valido por favor');
    // }
//   } );
// });



// PRUEBA PARA LA REFERENCIA DE HTML'S
// prueba.addEventListener('click', e =>{
// location.href="http://127.0.0.1:5500/src/prueba.html"; //AQUI SE PUEDE CAMBIAR LA DIRECCION
//  });
//TERMINA PRUEBA PARA LA REFERENCIA DE HTML'S
