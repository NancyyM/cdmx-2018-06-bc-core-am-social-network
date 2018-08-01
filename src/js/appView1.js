const commentInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('Button')[1]; //boton en la posición 1
const comentList = document.getElementById('completed-tasks');

let ref; //variable global

firebase.auth().onAuthStateChanged(function (user) {
  //console.log(user);
  //se agrega el nombre del usuario en la etiqueta con el id user-name que es un label
  document.getElementById('user-name').innerHTML =user.displayName;
  //alert(user.displayName);
});

//inicia las funciones principales y añade funcion sendCommentFirebase al boton de add publicacion
const init = () => {
  addButton.addEventListener('click', sendCommentFirebase);
    ref = firebase.database().ref().child('comentario');
  getCommentOfFirebase();
}

//la encargada de mandar a llamar la funcion addComment para crear los elementos
const getCommentOfFirebase = () => {
  ref.on('value', (snapshot) => {
    //console.log(snapshot.val());
    comentList.innerHTML = '';
    const data = snapshot.val()
    for (var key in data) {
      addComment(key, data[key])
    }
  })
}

//añade los elementos de la publicacion (label, botones) al id completed-tasks del html
const addComment = (key, commentCollection) => {
  const listItem = createNewCommentElement(key, commentCollection);
  listItem.setAttribute('data-keytask', key);
    comentList.appendChild(listItem);
  bindCommentsEvents(listItem)
}

//crea los elementos de la publicacion, label, botones etc..
const createNewCommentElement = (key,taskString) => {
  
  const listItem = document.createElement('p'); //creamos un nuevo elemento cada que se ingrese un nuevo comentario
  const label = document.createElement('label');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  const totalLikes = document.createElement('div');
  totalLikes.innerHTML = "Total de likes "+taskString.like;

  editButton.innerHTML = 'Edit &#9998;';
  editButton.className = 'edit';
  deleteButton.innerHTML = 'Delete &#x1F5D1;';
  deleteButton.className = 'delete';

  label.innerHTML = taskString.contenidoTask;

  const btn = document.createElement('input');
  btn.setAttribute('type', 'button'); // input element of type button
  btn.setAttribute('value', 'Like');
  let user = firebase.auth().currentUser;
  //console.log(taskString);
  let inArray = taskString.likeUser.indexOf(user.uid);

  if(inArray>0){
    btn.setAttribute('class', 'Like');
    btn.onclick = function() { deleteLike(key); };
  }else{
    btn.onclick = function() { addLike(key); };
  }
  listItem.appendChild(label);
  if(user.uid===taskString.userId){
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
  }
  listItem.appendChild(btn);
  listItem.appendChild(totalLikes);

  return listItem;
}

//agrega los botones de elimiar y editar una publicacion
const bindCommentsEvents = (commentListItem) => {
  const editButton = commentListItem.querySelector('button.edit');
  const deleteButton = commentListItem.querySelector('button.delete');
  if(editButton){
    editButton.addEventListener('click', editComment);
    deleteButton.addEventListener('click', deleteComment);
  }
}

//Edita comentario
const editComment = () => {
  const listItem = event.target.parentNode;
  const keyListItem = event.target.parentNode.dataset.keytask;
  const label  = listItem.querySelector('label');
  const editButton = event.target;
  const containsClass = listItem.classList.contains('editMode');
  const refTaskToEdit = ref.child(keyListItem);
  refTaskToEdit.once('value', (snapshot) => {
    const data = snapshot.val();

    if (containsClass) {
      const editInput = listItem.querySelector('input[type="text"]');
      refTaskToEdit.update({
        contenidoTask: editInput.value
      })
      editButton.innerHTML = 'Edit ';
      listItem.classList.remove('editMode');
      //editInput.value = '';
    } else {
      //console.log(containsClass, listItem);
      label.innerHTML = "<input type='text' value='"+data.contenidoTask+"' />";
      editButton.innerHTML = 'Save ';
      //editInput.value = ;
      listItem.classList.add('editMode')
    }

  })

}

//elimina comentario
const deleteComment = () => {
  let confirmation = confirm('EStas seguro de borrar la publicación');
  if(confirmation){
    const keyListItem = event.target.parentNode.dataset.keytask;
    const refTaskToDelete = ref.child(keyListItem);
    refTaskToDelete.remove();
  }
}

//agrega comentario
const sendCommentFirebase = () => {
  var user = firebase.auth().currentUser;
  ///console.log(user.uid);
  if(commentInput.value.trim() != ''){ //funcion nativa de JS que elimina los espacios de una cadena
    let arrayUser = {0:1};
    ref.push({
      contenidoTask : commentInput.value,
      userId : user.uid,
      like:0,
      likeUser :arrayUser
    });
    commentInput.value = '';
  }else{
    alert('No puedes realizar una publicación en blanco.')
  }
}

//detecta cuando se da clic en el boton de cerrar sesion
const btnCloseSesion = document.getElementById('close')
  btnCloseSesion.addEventListener('click', e =>{
    firebase.auth().signOut().then(function(){
      location.href="../index.html";
    }).catch(function(error){
    });
});

//se añade un like a la publicacion
const addLike = (idComentario) => {
  var user = firebase.auth().currentUser;
  const dataComentario = ref.child(idComentario);
  dataComentario.once('value', (snapshot) => {
    const data = snapshot.val();
    data.likeUser.push(user.uid);
    dataComentario.update({
      like: data.like+1,
      likeUser:data.likeUser
    })
  });
}

//se quita un like a la publicaciom
const deleteLike = (idComentario) => {
  var user = firebase.auth().currentUser;
  const dataComentario = ref.child(idComentario);
  dataComentario.once('value', (snapshot) => {
    const data = snapshot.val();
    //data.likeUser.push(user.uid);
    for (var i = 0; i < data.likeUser.length; i++)
    if (data.likeUser[i] === user.uid) { 
      data.likeUser.splice(i, 1);
        break;
    }
    //console.log(data.likeUser);
    const like = data.like-1
    if(like<0){
      like = 0;
    }
    dataComentario.update({
      like:like,
      likeUser:data.likeUser
    })
  });
}

window.onload = init
