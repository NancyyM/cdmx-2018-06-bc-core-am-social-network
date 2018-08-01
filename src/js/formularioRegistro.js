const usName = document.getElementById('name');
  const usEmail = document.getElementById('email');
  const usPassword = document.getElementById('password');
  const btnCreateAccount = document.getElementById('create');

  
  btnCreateAccount.addEventListener('click', e => {
    const userName = usName.value;
    const userEmail = usEmail.value;
    const userPassword = usPassword.value; 
    // console.log(cl);
    // console.log(userEmail);
    const auth = firebase.auth();
  
    const promise = auth.createUserWithEmailAndPassword(userEmail, userPassword);

    promise.then(function(){
      user = firebase.auth().currentUser;
      user.sendEmailVerification();
    }).then(function () {
      user.updateProfile({
        displayName: userName //aqui va el nombre del usuario
        //photoURL: photoURL
      });
      //console.log(user);
      location.href="../views/view1.html";
    }).catch(e => alert(e.message));
  });