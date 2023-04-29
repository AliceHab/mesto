class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userAboutSelector = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userAboutSelector.textContent = data.job;
  }
}

export default UserInfo;
