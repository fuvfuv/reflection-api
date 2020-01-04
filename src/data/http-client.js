const URL = `http://localhost:8000/api/v1`;

const METHOD = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const toJSON = (response) => {
  return response.json();
};

export default class ApiClient {
  constructor() {
    this._endPoint = URL;
  }

  getReflections() {
    return this._load({url: `reflections`}).then(toJSON);
  }

  getReflection(id) {
    return this._load({url: `reflections/${id}`}).then(toJSON);
  }

  deleteReflection(id) {
    return this._load({url: `reflections/${id}`, method: METHOD.DELETE});
  }

  createReflection(item) {
    return this._load({
      url: `reflections`,
      method: METHOD.POST,
      body: JSON.stringify(item),
      headers: new Headers({'Content-Type': `application/json`})
    }).then(toJSON);
  }

  updateReflection(id, data) {
    return this._load({
      url: `reflections/${id}`,
      method: METHOD.PUT,
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': `application/json`})
    }).then(toJSON);
  }

  _load({url, method = METHOD.GET, body = null, headers = new Headers()}) {
    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(this.checkStatus)
      .catch((err) => {
        window.console.error(`fetch error: ${err}`);
        throw err;
      });
  }

  static checkStatus(response) {
    if (response.ok) {
      return response;
    } else {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }
}
