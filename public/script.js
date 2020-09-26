// client-side js, loaded by index.html
// run by the browser each time the page is loaded

console.log("hello world :o");

function displayRadioValue() {
  var ele = document.getElementsByName("priority");

  for (let i = 0; i < ele.length; i++) {
    if (ele[i].checked) return ele[i].value;
  }
}

// define variables that reference elements on our page
const input1 = document.querySelector("#yourtask"),
          input2 = document.querySelector("#taskduedate"),
          input3 = displayRadioValue(),
          json1 = {
            yourtask: input1.value,
            date: input2.value,
            priority: input3
          }

// const dreamsList = document.getElementById("dreams");
const tasksList = document.getElementById("tasks");
const tasksForm = document.querySelector("form");

// a helper function that creates a list item for a given dream
function appendNewTask(task) {
  const newListItem = document.createElement("li");
  newListItem.innerText = task;
  tasksList.appendChild(newListItem);
}

// fetch the initial list of dreams
fetch("/task")
  .then(response => response.json()) // parse the JSON from the server
  .then(tasks => {
    // remove the loading text
    tasksList.firstElementChild.remove();

    // iterate through every dream and add it to our page
    tasks.forEach(appendNewTask);

    // listen for the form to be submitted and add a new dream when it is
    tasks.addEventListener("submit", event => {
      // stop our form submission from refreshing the page
      event.preventDefault();

      fetch("/add", {
        method: "POST",
        body: JSON.stringify(json1),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(json => {
          appendNewTask(json.yourtask);
        });

      // reset form
      tasksForm.reset();
      tasksForm.elements.dream.focus();
    });
  });
