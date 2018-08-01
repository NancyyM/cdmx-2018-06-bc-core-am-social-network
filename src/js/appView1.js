const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('Button')[1];
const inCompletedTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

let refTask;

const init = () => {
  addButton.addEventListener('click', sendTaskFirebase);
    refTask = firebase.database().ref().child('comentario');
  getTaskOfFirebase();
}

const addTask = (key, taskCollection) => {
  const listItem = createNewTaskElement(key,taskCollection);
  listItem.setAttribute('data-keytask', key);
    completedTaskList.appendChild(listItem);


  bindTaskEvents(listItem, taskCompleted)
}
const createNewTaskElement = (key,taskString) => {
  
  const listItem = document.createElement('p'); //creamos un nuevo elemento cada que se ingrese un nuevo comentario
  const label = document.createElement('label');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  const totalLikes = document.createElement('div');

  //const likeButton = document.createElement('button');
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
  console.log(taskString);
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

const taskCompleted = () => {
  const listItem = event.target.parentNode;
  const keyListItem = event.target.parentNode.dataset.keytask;
  const refTaskToCompleted = refTask.child(keyListItem);
  refTaskToCompleted.once('value', (snapshot) => {
    const data = snapshot.val();
    console.log(event.target.checked);
    if (event.target.checked) {
      completedTaskList.appendChild(listItem);
      refTaskToCompleted.update({
        status: 'completed'
      })
    } else {
      inCompletedTaskList.appendChild(listItem);

      refTaskToCompleted.update({
        status: 'incompleted'
      })
    }
  })


}

const bindTaskEvents = (taskListItem, checkboxEventHandle) => {
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');
  if(editButton){
    editButton.addEventListener('click', editTask);
    deleteButton.addEventListener('click', deleteTask);
  }
}

const editTask = () => {
  const listItem = event.target.parentNode;
  const keyListItem = event.target.parentNode.dataset.keytask;
  const label  = listItem.querySelector('label');
  const editButton = event.target;
  const containsClass = listItem.classList.contains('editMode');
  const refTaskToEdit = refTask.child(keyListItem);
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

const deleteTask = () => {
  let confirmation = confirm('EStas seguro de borrar la publicación');
  if(confirmation){
    const keyListItem = event.target.parentNode.dataset.keytask;
    const refTaskToDelete = refTask.child(keyListItem);
    refTaskToDelete.remove();
  }
}

const getTaskOfFirebase = () => {
  refTask.on('value', (snapshot) => {
    console.log(snapshot.val());
    inCompletedTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    const data = snapshot.val()
    for (var key in data) {
      addTask(key, data[key])
    }
  })
}

const sendTaskFirebase = () => {
  var user = firebase.auth().currentUser;
  ///console.log(user.uid);
  if(taskInput.value.trim() != ''){ //funcion nativa de JS que elimina los espacios de una cadena
    let arrayUser = {0:1};
    refTask.push({
      contenidoTask : taskInput.value,
      userId : user.uid,
      like:0,
      likeUser :arrayUser
    });
    taskInput.value = '';
  }else{
    alert('No puedes realizar una publicación en blanco.')
  }
}

const btnCloseSesion = document.getElementById('close')
  btnCloseSesion.addEventListener('click', e =>{
    firebase.auth().signOut().then(function(){
      location.href="../index.html";
    }).catch(function(error){
    });
});

firebase.auth().onAuthStateChanged(function (user) {
  //console.log(user);
  //se agrega el nombre del usuario en la etiqueta con el id user-name que es un label
  document.getElementById('user-name').innerHTML =user.displayName;
  //alert(user.displayName);
});

const addLike = (idComentario) => {
  var user = firebase.auth().currentUser;
  const dataComentario = refTask.child(idComentario);
  dataComentario.once('value', (snapshot) => {
    const data = snapshot.val();
    data.likeUser.push(user.uid);
    dataComentario.update({
      like: data.like+1,
      likeUser:data.likeUser
    })
  });
}
const deleteLike = (idComentario) => {
  var user = firebase.auth().currentUser;
  const dataComentario = refTask.child(idComentario);
  dataComentario.once('value', (snapshot) => {
    const data = snapshot.val();
    //data.likeUser.push(user.uid);
    for (var i = 0; i < data.likeUser.length; i++)
    if (data.likeUser[i] === user.uid) { 
      data.likeUser.splice(i, 1);
        break;
    }
    console.log(data.likeUser);
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
