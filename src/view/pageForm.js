export default class PageFrom {
  constructor() {
    this._name = null;
    this._email = null;
    this._jobPosition = null;

    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);

    this.bind();
  }

  set onSubmit(callBack) {
    this._onSubmit = callBack;
  }

  _processForm() {
    return {
      success: document.querySelector(`#user-name`).value,
      lowPoint: document.querySelector(`#user-email`).value,
      takeAway: document.querySelector(`#user-job`).value,
    };
  }

  _onSubmitBtnClick(e) {
    e.preventDefault();
    const newData = this._processForm();
    const isValid = Object.values(newData).filter((it) => it === ``).length === 0;
    if (isValid) {
      this._onSubmit(newData);
    } else {
      alert(`Заполните все поля формы`);
    }
  }

  bind() {
    document.querySelector(`.btn-submit`).addEventListener(`click`, this._onSubmitBtnClick);
  }

  unbind() {
    document.querySelector(`.btn-submit`).removeEventListener(`click`, this._onSubmitBtnClick);
  }
}
