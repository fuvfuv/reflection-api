import Component from './component';

export default class ListItem extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._name = data.success;
    this._email = data.lowPoint;
    this._jobPosition = data.takeAway;

    this._onBtnOpenClick = this._onBtnOpenClick.bind(this);
    this._onBtnEditClick = this._onBtnEditClick.bind(this);
    this._onBtnDeleteClick = this._onBtnDeleteClick.bind(this);
  }

  set onBtnOpen(callBack) {
    this._onOpen = callBack;
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
        <p class="field field-name">Name: <span>${this._name}</span></p>
        <p class="field field-email">Email: <span>${this._email}</span></p>
        <p class="field field-job">Job-position: <span>${this._jobPosition}</span></p>
      </div>
      <div class="controls">
        <button type="button" class="btn btn-secondary btn-open">Open Item</button>
        <button type="button" class="btn btn-secondary btn-edit">Edit</button>
        <button type="button" class="btn btn-danger btn-delete">Delete</button>
      </div>
    </li>`.trim();
  }

  _viewUpdate() {
    this.element.querySelector(`.field-name span`).textContent = this._name;
    this.element.querySelector(`.field-email span`).textContent = this._email;
    this.element.querySelector(`.field-job span`).textContent = this._jobPosition;
  }

  update(newData) {
    this._name = newData.success;
    this._email = newData.lowPoint;
    this._jobPosition = newData.takeAway;
    this._viewUpdate();
  }

  _onBtnOpenClick() {
    this.isFunction(this._onOpen(this._id));
  }

  _onBtnEditClick() {
    this.isFunction(this._onEdit);
  }

  _onBtnDeleteClick() {
    this.isFunction(this._onDelete(this._id));
  }

  bind() {
    this._element.querySelector(`.btn-open`).addEventListener(`click`, this._onBtnOpenClick);
    this._element.querySelector(`.btn-edit`).addEventListener(`click`, this._onBtnEditClick);
    this._element.querySelector(`.btn-delete`).addEventListener(`click`, this._onBtnDeleteClick);
  }

  unbind() {
    this._element.querySelector(`.btn-open`).removeEventListener(`click`, this._onBtnOpenClick);
    this._element.querySelector(`.btn-edit`).removeEventListener(`click`, this._onBtnEditClick);
    this._element.querySelector(`.btn-delete`).removeEventListener(`click`, this._onBtnDeleteClick);
  }
}
