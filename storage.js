class Storage {
  static getSearchedUsersfromStorage() {
    let users;
    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }
    return users;
  }
  static addSearchedUserstoStorage(username) {
    let users = this.getSearchedUsersfromStorage();
    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("searched", JSON.stringify(users));
  }
  static clearAllUserfromStorage() {
    localStorage.removeItem("searched");
  }
}
