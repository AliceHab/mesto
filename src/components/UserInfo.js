class UserInfo {
  constructor(userNameSelector, userAboutSelector, userAvatar) {
    this._userNameSelector = document.querySelector(userNameSelector);
    this._userAboutSelector = document.querySelector(userAboutSelector);
    this._userAvatar = document.querySelector(userAvatar);
  }

  getUserInfo() {
    return {
      name: this._userNameSelector.textContent,
      about: this._userAboutSelector.textContent,
    };
  }

  setUserInfo(data) {
    this._userNameSelector.textContent = data.name;
    this._userAboutSelector.textContent = data.about;
    this._userID = data._id;
  }

  editAvatar(data) {
    this._userAvatar.src = data.avatar;
  }

  getUserId() {
    return this._userID;
  }
}

export default UserInfo;
