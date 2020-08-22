const scriptURL =
  "https://script.google.com/macros/s/AKfycbwyfh0_XQFZc1ag3Ibhn1nGnINB7b1sLOvar59sEb99BJOI05l3/exec";
const form = document.forms["query-sheet"];

let name = document.getElementById("query-name");
let email = document.getElementById("query-email");
let msg = document.getElementById("query-msg");

form.addEventListener("submit", e => {
  e.preventDefault();
  if (isValidForm()) {
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(response => {
        console.log(response);
        showMessage("success", "Your Query Has Been Submitted");
        clearFields();
      })
      .catch(error => console.error("Error!", error.message));
  }
});

function clearFields() {
  name.value = "";
  email.value = "";
  msg.value = "";
}

function showMessage(classes, msg) {
  const p = document.querySelector(".form-message");
  p.className = "form-message " + classes;
  p.textContent = msg;
  setTimeout(() => {
    p.textContent = "";
    p.className = "form-message";
  }, 3000);
}

function isValidForm() {
  if (name.value == "" || email.value == "" || msg.value == "") {
    showMessage("alert alert-danger", "Fields shouldn't be empty");
    return false;
  } else {
    return true;
  }
}
