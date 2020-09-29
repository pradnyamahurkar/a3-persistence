var users = [];
var meetings = [];
var account = "guest"

// const meetingList = document.getElementById("meetings");
const login = document.getElementById("login");
const error = document.getElementById("error");

function addUser(user, pass, id) {
  const newUser = document.createElement("li");
  newUser.innerText = user + " " + pass;
  
  users.push({
    "user": user,
    "pass": pass,
    "id": id
  });
}

login.addEventListener("click", event => {
  event.preventDefault();

  let newUser = login.elements.user.value;
  let newPass = login.elements.password.value;
  
  let createAccount = true;
  
  users.forEach(user => {
    if(user.user.localeCompare(newUser) === 0) {
      createAccount = false;
      if(user.pass.localeCompare(newPass) === 0) {
        account = newUser;
        localStorage.setItem("account", newUser);
        alert("Successfully logged in!");
      }
      else {
        error.innerHTML = "<span class='label label-danger'>ERROR: Wrong Password for this Username</span>";
      }
    }
  })

  if(createAccount) {
    
    fetch("/adduser", {
      method: "POST",
      body: JSON.stringify({ user: newUser, pass: newPass }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(json => {
        addUser(json.user, json.pass, json._id);
        account = json.user;
        localStorage.setItem("account", newUser);
        alert("Successfully logged in!");
      });
    
  }

  login.reset();
  login.elements.username.focus();
});

