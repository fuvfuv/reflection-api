import Component from './component';

export default class ListItem extends Component {
  constructor(data) {
    super();
    const {id, success, lowPoint, takeAway} = data;

    this._id = id;
    this._field = success;
    this._lowField = lowPoint;
    this._takeField = takeAway;

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
        <p class="field field-name">Field 1: <span>${this._field}</span></p>
        <p class="field field-email">Field 2: <span>${this._lowField}</span></p>
        <p class="field field-job">Field 3: <span>${this._takeField}</span></p>
      </div>
      <div class="controls">
        <button type="button" class="btn btn-secondary btn-open">Open Item</button>
        <button type="button" class="btn btn-secondary btn-edit">Edit</button>
        <button type="button" class="btn btn-danger btn-delete">Delete</button>
      </div>
    </li>`.trim();
  }

  _viewUpdate() {
    this.element.querySelector(`.field-name span`).textContent = this._field;
    this.element.querySelector(`.field-email span`).textContent = this._lowField;
    this.element.querySelector(`.field-job span`).textContent = this._takeField;
  }

  update(newData) {
    this._filed = newData.success;
    this._lowField = newData.lowPoint;
    this._takeField = newData.takeAway;
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

  findElements() {
    this.btnOpen = this._element.querySelector(`.btn-open`);
    this.btnEdit = this._element.querySelector(`.btn-edit`);
    this.btnDelete = this._element.querySelector(`.btn-delete`);
  }

  bind() {
    this.btnOpen.addEventListener(`click`, this._onBtnOpenClick);
    this.btnEdit.addEventListener(`click`, this._onBtnEditClick);
    this.btnDelete.addEventListener(`click`, this._onBtnDeleteClick);
  }

  unbind() {
    this.btnOpen.removeEventListener(`click`, this._onBtnOpenClick);
    this.btnEdit.removeEventListener(`click`, this._onBtnEditClick);
    this.btnDelete.removeEventListener(`click`, this._onBtnDeleteClick);
  }
}
