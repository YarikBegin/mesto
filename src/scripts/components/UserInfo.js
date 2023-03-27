export default class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this.name = document.querySelector(selectorName);
    this.job = document.querySelector(selectorJob);
  }
  getUserInfo () {
    return {
    user: this.name.textContent,
    job: this.job.textContent,
  }
  }
  setUserInfo ({ user, job }) {
    this.name.textContent = user;
    this.job.textContent = job;
  }
}
