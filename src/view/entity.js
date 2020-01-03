import Component from './component';

class Entity extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._name = data.success;
    this._email = data.lowPoint;
    this._jobPosition = data.takeAway;

    this._onBtnEditClick = this._onBtnEditClick.bind(this);
    this._onBtnDeleteClick = this._onBtnDeleteClick.bind(this);
  }

  set onBtnEdit(callBack) {
    this._onEdit = callBack;
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
        <button type="button" class="btn btn-secondary btn-edit">Edit</button>
        <button type="button" class="btn btn-danger btn-delete">Delete</button>
      </div>
    </li>`.trim();
  }

  update(newData) {
    this._name = newData.success;
    this._email = newData.lowPoint;
    this._jobPosition = newData.takeAway;
  }

  _onBtnEditClick() {
    this.isFunction(this._onEdit);
  }

  _onBtnDeleteClick() {
    this.isFunction(this._onDelete);
  }

  bind() {
    this._element.querySelector(`.btn-edit`).addEventListener(`click`, this._onBtnEditClick);
    this._element.querySelector(`.btn-delete`).addEventListener(`click`, this._onBtnDeleteClick);
  }

  unbind() {
    this._element.querySelector(`.btn-edit`).removeEventListener(`click`, this._onBtnEditClick);
    this._element.querySelector(`.btn-delete`).removeEventListener(`click`, this._onBtnDeleteClick);
  }
}

export default Entity;
