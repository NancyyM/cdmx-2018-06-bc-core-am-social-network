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


// creando usuario

const usuario = document.getElementById('user1');
const clave = document.getElementById('password1');
const btn = document.getElementById('login');
const btnUser = document.getElementById('checkIn');


// Creacion de ususario.
btn.addEventListener('click', e =>{
const mail = usuario.value;
console.log(mail);
const cl = clave.value;
const auth = firebase.auth();
const promise = auth.createUserWithEmailAndPassword(mail, cl);
promise.catch(e => console.log(e.message));

});

btnUser.addEventListener('click', e =>{
  const mail1 = usuario.value;
  
  const cl1 = clave.value;
  
  const auth = firebase.auth();
 
const promise = auth.signInWithEmailAndPassword(mail1, cl1);
promise.catch(e => console.log(e.message));

});


































  // loadSesion = () =>{
  //   document.getElementById('cuenta1').addEventListener('click',(event)=>{
  //     const usuario1 = document.getElementById('user1');
  //     const clave1 = document.getElementById('password1');
  //     const btn1 = document.getElementById('cuenta1');
  //     let  userone = usuario1.value;
  //     console.log(userone);
  //     let cla1 = clave1.value;
  //     let bt1 = btn1.value;

  //   });
  


  // }
  // loadSesion();

  // Creacion de usuario view1
  // createUser = () =>{
  //   document.getElementById('account').addEventListener('click',(event)=>{
  //     const email = document.getElementById('email');
  //     const clave = document.getElementById('password');
  //     const btn = document.getElementById('account');
  //     const auth = firebase.auth();
  //     const promise = auth.createUserWithEmailAndPassword(email,clave);
  //     promise.catch(e => console.log(e.message));
  //     promise.push('createUserWithEmailAndPassword'); 
  //     let  mail = email.value;
  //     console.log(mail);
  //     let cla = clave.value;
  //     console.log(cla);
  //     let bt = btn.value;
   
        
       
  //     });
     
     
      
    

  //   };
  //  createUser();












//   // const usuario = document.getElementById('user');
//   // const clave = document.getElementById('password');
//   // const btn = document.getElementById('cuenta');
//   // const usuario1 = document.getElementById('user1');
//   // const clave1 = document.getElementById('password1');
//   // const btn1 = document.getElementById('cuenta1');
  
//   // console.log(usuario);
//   createUser = ()=>{
// document.getElementById('account1').addEventListener('click', e =>{
// const email = usuario.value;
// // console.log(email);
// const cl = clave.value;
// // console.log(cl);
// const auth = firebase.auth();

// const promise = auth.createUserWithEmailAndPassword(email, cl);
// promise.catch(e => console.log(e.message));
// }
// // function pintar
// // btn.addEventListener('click', e =>{
// //   const email1 = usuario.value;
// //   // console.log(email);
// //   const cl1 = clave.value;
// //   // console.log(cl);
// //   const auth = firebase.auth(); 
// //   const promise = auth.createUserWithEmailAndPassword(email, cl);
//   promise.catch(e => console.log(e.message));


  


  