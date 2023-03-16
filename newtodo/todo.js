const newTaskInput = document.getElementById("new-task");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const taskFilter = document.getElementById("task-filter");
const ex=document.getElementById("ex");
const im=document.getElementById("myfile");
const jsonFileInput = document.getElementById('json-file-input');
const importBtn = document.getElementById('import-btn');




let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks from local storage
tasks.forEach((task) => {
    console.log(task);
  const taskItem = createTaskItem(task.text, task.complete);
  taskList.appendChild(taskItem);
});

addBtn.addEventListener("click", () => {
  const taskText = newTaskInput.value;

  if (taskText) {
      tasks.push({ text: taskText, complete: false });
    const taskItem = createTaskItem(taskText, false);

    taskList.appendChild(taskItem);
    saveTasks();

    newTaskInput.value = "";
  }
});

taskFilter.addEventListener("change", () => {
  const selectedValue = taskFilter.value;
  const taskItems = document.querySelectorAll(".task-item");

  taskItems.forEach((taskItem) => {
    switch (selectedValue) {
      case "complete":
        taskItem.style.display = taskItem.classList.contains("complete") ? "flex" : "none";
        break;
      case "incomplete":
        taskItem.style.display = taskItem.classList.contains("complete") ? "none" : "flex";
        break;
      default:
        taskItem.style.display = "flex";
    }
  });
});

function createTaskItem(text, complete) {
  const taskItem = document.createElement("li");
  taskItem.classList.add("task-item");

  if (complete) {
    taskItem.classList.add("complete");
  }

  const taskTextEl = document.createElement("span");
  taskTextEl.classList.add("task-text");
  taskTextEl.innerText = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";

  deleteBtn.addEventListener("click", () => {
    taskItem.remove();
    tasks = tasks.filter((task) => task.text !== text);
    saveTasks();
  });

  taskItem.appendChild(taskTextEl);
  taskItem.appendChild(deleteBtn);

  taskItem.addEventListener("click", () => {
    taskItem.classList.toggle("complete");
    const task = tasks.find((task) => task.text === text);
    task.complete = !task.complete;
    saveTasks();
  });

  return taskItem;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}


function exportToJsonFile(jsonData) {
  let dataStr = JSON.stringify(jsonData);
  let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);

  let exportFileDefaultName = 'data.json';

  let linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

ex.addEventListener("click", () => {
  exportToJsonFile(tasks);
});






jsonFileInput.addEventListener('change', (event) => {
  
  const file = event.target.files[0];
  const reader = new FileReader();
  
  reader.onload = (event) => {
    const json = event.target.result;
    localStorage.setItem('myData', json);
    console.log('JSON data imported and stored in localStorage!');
  }
  
  reader.readAsText(file);
});


importBtn.addEventListener('click', () => {
  const json = localStorage.getItem('myData');
  const data = JSON.parse(json);
  console.log('JSON data imported from localStorage:', data);
});

