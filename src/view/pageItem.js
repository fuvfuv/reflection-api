export default class PageItem {
  constructor(data) {
    const {success, takeAway, lowPoint} = data;

    this._name = success;
    this._email = takeAway;
    this._jobPosition = lowPoint;

    this.listItemOne = document.querySelector(`.list-item-1 span`);
    this.listItemTwo = document.querySelector(`.list-item-2 span`);
    this.listItemThree = document.querySelector(`.list-item-3 span`);
  }

  set onSubmit(callBack) {
    this._onSubmit = callBack;
  }

  render() {
    this.listItemOne.textContent = this._name;
    this.listItemTwo.textContent = this._email;
    this.listItemThree.textContent = this._jobPosition;
  }
}
