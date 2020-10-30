const users = [
  {
    email: "dollariyke@gmail.com",
    password: "winners",
  },
  {
    email: "james@gmail.com",
    password: "jamers",
  },
  {
    email: "peter@gmail.com",
    password: "peters",
  },
  {
    email: "mark@gmail.com",
    password: "markers",
  },
  {
    email: "andrew@gmail.com",
    password: "andrewers",
  },
  {
    email: "test@test.com",
    password: "password123",
  },
];

const changeBorderColor = () => {
  const inputs = document.getElementsByClassName("form-control");

  for (let i = 0; i < inputs.length; i++) {
    inputs[i].style.borderColor = "red";
  }
};

function login() {
  const username = document.getElementById("Email1").value;
  const password = document.getElementById("InputPassword1").value;
  event.preventDefault();

  console.log("checking " + username);
  console.log("checking " + password);

  let userExists = 0;

  for (let i = 0; i < users.length; i++) {
    console.log("checking " + username + " against " + users[i].email);
    console.log("checking " + password + " against " + users[i].password);
    if (username === users[i].email && password === users[i].password) {
      userExists++;
    }
  }
  if (userExists > 0) {
    window.location.assign("index.html");
  }

  document.querySelector("#error-div").classList.remove("d-none");
  changeBorderColor();
}

let mybtn = document.getElementById("submit");
mybtn.addEventListener("click", login);
