import Component from './component';

export default class PopupForm extends Component {
  constructor(data) {
    const {success, takeAway, lowPoint} = data;
    super();

    this._field = success;
    this._lowField = lowPoint;
    this._takeField = takeAway;

    this.btnSave = null;
    this.closeBtns = null;

    this._onBtnSaveClick = this._onBtnSaveClick.bind(this);
    this._onBtnCloseClick = this._onBtnCloseClick.bind(this);
  }

  set onBtnSave(callBack) {
    this._onSave = callBack;
  }

  set onBtnClose(callBack) {
    this._onClose = callBack;
  }

  get template() {
    return `
    <div class="modal show-modal">
      <div class="modal-dialog">
        <form class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Edit</h5>
            <button type="button" class="close btn-close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="user-name">Name</label>
              <input type="text" class="form-control" id="user-name" placeholder="name" value="${this._field}" />
            </div>
            <div class="form-group">
              <label for="user-email">Email</label>
              <input type="text" class="form-control" id="user-email" placeholder="email" value="${this._lowField}" />
            </div>
            <div class="form-group">
              <label for="user-job">Job-position</label>
              <input type="text" class="form-control" id="user-job" placeholder="job-position" value="${this._takeField}" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary btn-save">Save changes</button>
            <button type="button" class="btn btn-secondary btn-close" data-dismiss="modal">Close</button>
          </div>
        </form>
      </div>
    </div>`.trim();
  }

  _processForm() {
    return {
      success: this.element.querySelector(`#user-name`).value,
      lowPoint: this.element.querySelector(`#user-email`).value,
      takeAway: this.element.querySelector(`#user-job`).value,
    };
  }

  _onBtnSaveClick(e) {
    e.preventDefault();
    const newData = this._processForm();
    this.isFunction(this._onSave(newData));
  }

  _onBtnCloseClick() {
    this.isFunction(this._onClose());
  }

  findElements() {
    this.btnSave = this._element.querySelector(`.btn-save`);
    this.closeBtns = this._element.querySelectorAll(`.btn-close`);
  }

  bind() {
    this.btnSave.addEventListener(`click`, this._onBtnSaveClick);

    this.closeBtns.forEach((it) => {
      it.addEventListener(`click`, this._onBtnCloseClick);
    });
  }

  unbind() {
    this.btnSave.removeEventListener(`click`, this._onBtnSaveClick);

    this.closeBtns.forEach((it) => {
      it.removeEventListener(`click`, this._onBtnCloseClick);
    });
  }
}
