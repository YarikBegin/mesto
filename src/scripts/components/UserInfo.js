export default class UserInfo {
  constructor({ selectorName, selectorJob, selectorAvatar }) {
    this.name = document.querySelector(selectorName);
    this.job = document.querySelector(selectorJob);
    this.avatar = document.querySelector(selectorAvatar);
  }
  getUserId() {
    return this._id;
  }
  getUserInfo () {
    return {
    name: this.name.textContent,
    job: this.job.textContent,
    avatar: this.avatar.src
  }
  }
  setUserInfo({
    name = this.name.textContent,
    about = this.job.textContent,
    avatar = this.avatar.src,
    _id,
  }) {
    this._id = _id;
    this.name.textContent = name;
    this.job.textContent = about;
    this.avatar.src = avatar;
  }
}
