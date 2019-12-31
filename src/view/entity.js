import Component from './component';

class Entity extends Component {
  constructor(data) {
    super();
    this._name = data.success;
    this._email = data.lowPoint;
    this._jobPosition = data.takeAway;

    this._onBtnUpdateClick = this._onBtnUpdateClick.bind(this);
    this._onBtnDeleteClick = this._onBtnDeleteClick.bind(this);
  }

  set onBtnUpdate(callBack) {
    this._onUpdate = callBack;
  }

  set onBtnDelete(callBack) {
    this._onDelete = callBack;
  }

  get template() {
    return `
    <li class="list-group-item">
      <div class="list-group-item-wrapper">
        <p class="field">Name: <span>${this._name}</span></p>
        <p class="field">Email: <span>${this._email}</span></p>
        <p class="field">Job-position: <span>${this._jobPosition}</span></p>
      </div>
      <div class="controls">
        <button type="button" class="btn btn-secondary btn-update">Update</button>
        <button type="button" class="btn btn-danger btn-delete">Delete</button>
      </div>
    </li>`.trim();
  }

  _onBtnUpdateClick() {
    return typeof this._onUpdate === `function` && this._onUpdate();
  }

  _onBtnDeleteClick() {
    return typeof this._onDelete === `function` && this._onDelete();
  }

  bind() {
    this._element.querySelector(`.btn-update`).addEventListener(`click`, this._onBtnUpdateClick);
    this._element.querySelector(`.btn-delete`).addEventListener(`click`, this._onBtnDeleteClick);
  }

  unbind() {
    this._element.querySelector(`.btn-update`).removeEventListener(`click`, this._onBtnUpdateClick);
    this._element.querySelector(`.btn-delete`).removeEventListener(`click`, this._onBtnDeleteClick);
  }
}

export default Entity;
