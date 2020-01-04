export default class PageFrom {
  constructor() {
    this._onSubmitBtnClick = this._onSubmitBtnClick.bind(this);

    this.btnSubmit = document.querySelector(`.btn-submit`);
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
    this.btnSubmit.addEventListener(`click`, this._onSubmitBtnClick);
  }

  unbind() {
    this.btnSubmit.removeEventListener(`click`, this._onSubmitBtnClick);
  }
}
