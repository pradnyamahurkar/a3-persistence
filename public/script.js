// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

const loginForm = document.getElementById("loginregister");
const loginButton = document.getElementById("login");
const signupButton = document.getElementById("signup");

function login(e) {
    e.preventDefault();

    let sensei = document.getElementById("user").value;
    let password = document.getElementById("password").value;

    fetch('/login', {
      method: "POST",
      body: JSON.stringify({sensei, password}),
      headers: {
        "Content-Type":"application/json"
      }
    })
    .then(async function(response) {
      if (response.status === 200) {
        let json = await response.json();
        let username = json.username;
        document.title = "Dojo Roster Management";
        document.getElementById("loginPage").hidden = true;
        document.getElementById("mainPage").hidden = false;
        senseiElement.innerText = username;
        getRoster();
      } 
      else {
        window.alert("Incorrect username or password");
      }
    });
}

// function for getting the checked radio button
function displayRadioValue() {
  var ele = document.getElementsByName("priority");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}

document.getElementById("Login").onclick = function () {
  location.href = "views/login.html"
}

// define variables that reference elements on our page

// const dreamsList = document.getElementById("dreams");
// reference to the list of tasks and refer to the form
const tasksList = document.getElementById("tasks");
const tasksForm = document.querySelector("form");

function updateTable(json) {
  const tableBody = document.getElementById("taskBody");
  let update = tableBody.insertRow(-1);

  let date = update.insertCell(0)
  let yourtask = update.insertCell(1)
  let priority = update.insertCell(2)
  let advice = update.insertCell(3)
  let remove = update.insertCell(4)
  let edit = update.insertCell(5)
  
  date.contentEditable = "true"
  yourtask.contentEditable = "true"
  priority.contentEditable = "true"
  advice.contentEditable = "true"
  
  var deleteButton = document.createElement("Button")
  deleteButton.innerHTML = "Delete"
  deleteButton.addEventListener("click", function () {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ id: json._id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        update.remove();
      });
  });
  
  var updateButton = document.createElement("Button")
  updateButton.innerHTML = "Update"
  updateButton.addEventListener("click", function() {
    fetch("/update", {
      method: "POST",
      body: JSON.stringify({ id: json._id, object: json }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then (response => response.json())
    .then(json => {
      update.remove();
      updateTable(json)
    })
  })
  
  date.innerHTML = json.date;
  yourtask.innerHTML = json.yourtask;
  priority.innerHTML = json.priority;
  advice.innerHTML = json.message;
  remove.appendChild(deleteButton);
  edit.appendChild(updateButton);
  // update.insertCell(4).innerHTML = json.delete;
  
  // return update
  
}

// a helper function that creates a list item for a given dream
function appendNewTask(task) {
  // const newListItem = document.createElement("li");
  // newListItem.innerText =
  //   "TASK: " +
  //   String(task.yourtask) +
  //   "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
  //   "DUE DATE: " +
  //   String(task.date) +
  //   "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
  //   "PRIORITY: " +
  //   String(task.priority) +
  //   "\xa0\xa0\xa0\xa0\xa0\xa0\xa0" +
  //   "ADVICE: " +
  //   String(task.message);
  const newListItem = updateTable(task)
 
  newListItem.ondblclick = function() {
    fetch("/delete", {
      method: "POST",
      body: JSON.stringify({ id: task._id }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        newListItem.remove();
      });
  };

  // click on the list item once
  // enter your new task in the task field
  //send the id and the task to the server
  // get back a json, delete the new list item
  // create a new one with similar information
  // newListItem.onclick = function() {
  //   tasksForm.addEventListener("modify", event => {
  //     // stop our form submission from refreshing the page
  //     let modifiedtask = document.querySelector("#yourtask");
  //     event.preventDefault();
  //     fetch("/update", {
  //       method: "POST",
  //       body: JSON.stringify({id: task._id, yourtask: modifiedtask, date: task.date, priority: task.priority}),
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     })
  //     .then(response => response.json())
  //     .then(json => {
  //       newListItem.task = json.task;
  //     })
  //   });
  // };
  tasksList.appendChild(newListItem);
}

// fetch the initial list of tasks
fetch("/task")
  .then(response => response.json()) // parse the JSON from the server
  .then(tasks => {
    // remove the loading text
    tasksList.firstElementChild.remove();

    // iterate through every dream and add it to our page
    tasks.forEach(appendNewTask);
  });
// listen for the form to be submitted and add a new dream when it is
tasksForm.addEventListener("submit", event => {
  // stop our form submission from refreshing the page
  event.preventDefault();

  const input1 = document.querySelector("#yourtask"),
    input2 = document.querySelector("#taskduedate"),
    input3 = displayRadioValue(),
    json1 = {
      yourtask: input1.value,
      date: input2.value,
      priority: input3
    };

  // send information from the form to the server
  fetch("/add", {
    method: "POST",
    body: JSON.stringify(json1),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(response => response.json())
    .then(json => {
      appendNewTask(json);
    });

  // reset form
  tasksForm.reset();
  tasksForm.elements.yourtask.focus();
});
