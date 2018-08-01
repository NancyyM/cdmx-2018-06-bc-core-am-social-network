const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('Button')[0];
const inCompletedTaskList = document.getElementById('incomplete-tasks');
const completedTaskList = document.getElementById('completed-tasks');

let refTask;


const init = () => {
  addButton.addEventListener('click', sendTaskFirebase);
    refTask = firebase.database().ref().child('comentario');
  getTaskOfFirebase();
}

const createNewTaskElement = (taskString) => {
  const listItem = document.createElement('p'); //creamos un nuevo elemento cada que se ingrese un nuevo comentario
  const label = document.createElement('label');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');


  editButton.innerHTML = 'Edit &#9998;';
  editButton.className = 'edit';
  deleteButton.innerHTML = 'Delete &#x1F5D1;';
  deleteButton.className = 'delete';

  label.innerHTML = taskString;

  listItem.appendChild(label);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}


const addTask = (key, taskCollection) => {
  const listItem = createNewTaskElement(taskCollection.contenidoTask);
  listItem.setAttribute('data-keytask', key);
    completedTaskList.appendChild(listItem);


  bindTaskEvents(listItem, taskCompleted)
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

  editButton.addEventListener('click', editTask);

  deleteButton.addEventListener('click', deleteTask);
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
    inCompletedTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';
    const data = snapshot.val()
    for (var key in data) {
      addTask(key, data[key])
    }
  })
}

const sendTaskFirebase = () => {
  if(taskInput.value.trim() != ''){ //funcion nativa de JS que elimina los espacios de una cadena
    refTask.push({
      contenidoTask : taskInput.value
      //status : 'incomplete'
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

let btnlike = document.getElementById('like');

btnlike.addEventListener ("click", event =>{
console.log("hola");

});

window.onload = init