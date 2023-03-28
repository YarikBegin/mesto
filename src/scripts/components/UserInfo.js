export default class UserInfo {
  constructor({ selectorName, selectorJob }) {
    this.name = document.querySelector(selectorName);
    this.job = document.querySelector(selectorJob);
  }
  getUserInfo () {
    return {
    name: this.name.textContent,
    job: this.job.textContent,
  }
  }
  setUserInfo ({ name, job }) {
    this.name.textContent = name;
    this.job.textContent = job;
  }
}
