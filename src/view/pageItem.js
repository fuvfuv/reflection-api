export default class PageItem {
  constructor(data) {
    const {name, email, jobPosition} = data;

    this._name = name;
    this._email = email;
    this._jobPosition = jobPosition;
  }

  set onSubmit(callBack) {
    this._onSubmit = callBack;
  }

  viewRender() {
    document.querySelector(`.field-1`).textContent = this._name;
    document.querySelector(`.field-2`).textContent = this._emai;
    document.querySelector(`.field-3`).textContent = this._jobPosition;
  }
}
