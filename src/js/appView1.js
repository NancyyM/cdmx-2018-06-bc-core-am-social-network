// Set the configuration for your app
 // TODO: Replace with your project's config object
 var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://login-35451.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);
<<<<<<< HEAD:src/js/app.js
  //para ingresar a guardar la data 
  var storage = firebase.storage();

=======
  
>>>>>>> 99993891d77abd75fd2b1e772add5cdfd5a7c425:src/js/appView1.js
  // Get a reference to the database service
  var database = firebase.database();
 


 
  const btnsave= document.getElementById('public')
  const btnedit = document.getElementById('edit')
  //input para comentar
  const validComenter = document.getElementById('comenters')
  const comentPage = document.getElementById('comment')

  btnsave.addEventListener('click', e =>{
      let comentario = validComenter.value;
       comment.innerHTML = comentario
      //  object = firebase.database().ref().child('user1')
       writeUserData();
  });


<<<<<<< HEAD:src/js/app.js























 
//   const btnsave= document.getElementById('public')
//   const btnedit = document.getElementById('edit')
//   //input para comentar
//   const validComenter = document.getElementById('comenters')
//   const comentPage = document.getElementById('comment')
//   const perfil = document.getElementById('user1')
 
=======
const btnCloseSesion = document.getElementById('close')
  btnCloseSesion.addEventListener('click', e =>{
    firebase.auth().signOut().then(function(){
      location.href="../index.html";
    }).catch(function(error){
    });
});
>>>>>>> 99993891d77abd75fd2b1e772add5cdfd5a7c425:src/js/appView1.js
 

// const object = firebase.database().ref().child('user1')

//   btnsave.addEventListener('click', e =>{
//       let comentario = validComenter.value;
//        comment.innerHTML = comentario
//       //  object = firebase.database().ref().child('user1')
//        writeUserData();
//   });
 
//   writeUserData = (user1, name, email, imageUrl)=> {
//     firebase.database().ref().child(user1)({
//       username: name,
//       email: email,
//       profile_picture : imageUrl
      
//     });
//     console.log(writeUserData);
//   }
  
//  //   edit.addEventListener('click', e =>{
 
 
<<<<<<< HEAD:src/js/app.js
//  //   })
=======
 //   })

//  firebase.auth().onAuthStateChanged(function(user){
//   if(user){
//     alert(user.displayName);
//   }else{
//     alert('NO session');
//   }
// });
>>>>>>> 99993891d77abd75fd2b1e772add5cdfd5a7c425:src/js/appView1.js
