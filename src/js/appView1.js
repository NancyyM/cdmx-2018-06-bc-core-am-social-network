// Set the configuration for your app
 // TODO: Replace with your project's config object
 var config = {
    apiKey: "apiKey",
    authDomain: "projectId.firebaseapp.com",
    databaseURL: "https://login-35451.firebaseio.com",
    storageBucket: "bucket.appspot.com"
  };
  firebase.initializeApp(config);
  
  // Get a reference to the database service
  var database = firebase.database();
 
 
  const btnsave= document.getElementById('save')
  const btnedit = document.getElementById('edit')
  //input para comentar
  const validComenter = document.getElementById('comenters')
  const comentPage = document.getElementById('comment')
 
 
  btnsave.addEventListener('click', e =>{
      let comentario = validComenter.value;
       comment.innerHTML = comentario
  });


const btnCloseSesion = document.getElementById('close')
  btnCloseSesion.addEventListener('click', e =>{
    firebase.auth().signOut().then(function(){
      location.href="../index.html";
    }).catch(function(error){
    });
});
 
 
 //   edit.addEventListener('click', e =>{
 
 
 //   })

//  firebase.auth().onAuthStateChanged(function(user){
//   if(user){
//     alert(user.displayName);
//   }else{
//     alert('NO session');
//   }
// });