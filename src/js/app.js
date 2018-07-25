// Set the configuration for your app
 // TODO: Replace with your project's config object
 var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://login-35451.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);
  //para ingresar a guardar la data 
  var storage = firebase.storage();

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

























 
//   const btnsave= document.getElementById('public')
//   const btnedit = document.getElementById('edit')
//   //input para comentar
//   const validComenter = document.getElementById('comenters')
//   const comentPage = document.getElementById('comment')
//   const perfil = document.getElementById('user1')
 
 

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
 
 
//  //   })