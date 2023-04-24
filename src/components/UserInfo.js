class UserInfo {
  constructor(userNameSelector, userAboutSelector) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userAboutSelector = document.querySelector(userAboutSelector);
  }

  getUserInfo() {
    this._userInfo = {};
    this._userInfo.name = this._userNameSelector.textContent;
    this._userInfo.about = this._userAboutSelector.textContent;
    return this._userInfo;
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userAboutSelector.textContent = data.job;
  }
}

export default UserInfo;
