class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate BaseComponent, only concrete one.`);
    }
  }

  bind() {}
  unbind() {}
  update() {}

  get element() {
    return this._element;
  }

  get template() {
    throw new Error(`You have to define template.`);
  }

  _createElement(template) {
    const newElement = document.createElement(`template`);
    newElement.innerHTML = template;

    return newElement.content.cloneNode(true);
  }

  render() {
    this._docFragment = this._createElement(this.template);
    this._element = this._docFragment.children[0];
    this.bind();
    return this._element;
  }

  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
}

export default Component;
