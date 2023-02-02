const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearUser = document.querySelector("#clear-last-users");
const lastUser = document.querySelector("#last-users");
const github = new Github();
const ui = new UI();
addEventListeners();
function addEventListeners() {
  githubForm.addEventListener("submit", getdata);
  clearUser.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}
function getdata(e) {
  let username = nameInput.value.trim();
  if (username === "") {
    ui.showAlert("Please write username");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showAlert("Username not found");
        } else {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserstoStorage(username);

          ui.showuserInfo(response.user);
          ui.showRepo(response.repo);
        }
      })
      .catch((err) => ui.showAlert(err));
  }
  ui.clearInput();
  e.preventDefault();
}
function clearAllSearched() {
  if (confirm("Are you sure?")) {
    Storage.clearAllUserfromStorage();
    ui.clearAllSearchedFromUI();
  }
}
function getAllSearched() {
  let users = Storage.getSearchedUsersfromStorage();

  let result = "";
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });

  lastuser.innerHTML = result;
}
