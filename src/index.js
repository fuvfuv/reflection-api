import "./main.scss";
import ApiClient from './data/http-client.js';
import Entity from './view/entity';
import PopupForm from './view/popupForm';

const api = new ApiClient();
const itemsContainer = document.querySelector(`.list`);

const updateData = (item, newData, itemComponent) => {
  item = Object.assign(item, newData);

  console.log(item);
  // requestToUpdateItem({id: item.id, data: item});
  // itemComponent.update(newData);
};

const renderItems = (items) => {
  itemsContainer.innerHTML = ``;

  for (let item of items) {
    const itemComponent = new Entity(item);
    const popupFormComponent = new PopupForm(item);
    itemsContainer.appendChild(itemComponent.render());

    itemComponent.onBtnEdit = () => {
      // console.log(`Update item`);

      itemsContainer.appendChild(popupFormComponent.render());
    };

    itemComponent.onBtnDelete = (id) => {
      // console.log(`Delete item, ${id}`);
      requestToDeleteItem(id);
    };

    // временно

    popupFormComponent.onBtnSave = (newData) => {
      updateData(item, newData);
    };

    popupFormComponent.onBtnClose = () => {
      // console.log(`Close popup`);
      popupFormComponent.unrender();
    };
  }
};

const onRequestError = () => {
  console.log(`Error in request`);
};

// запрос на создание нового айтема
async function requestToCreateItem(newData) {
  try {
    await api.createReflection(newData);
    await api.getReflections().then((data) => {
      renderItems(data);
    });
  } catch (err) {
    onRequestError();
  }
}

// запрос на обновление айтема
async function requestToUpdateItem(id, newData) {
  try {
    await api.updateReflection(id, newData);
    await api.getReflections().then((data) => {
      renderItems(data);
    });
  } catch (err) {
    onRequestError();
  }
}

// получение всех айтемов
async function requestToGetItems() {
  try {
    await api.getReflections().then((data) => {
      renderItems(data);
    });
  } catch (err) {
    onRequestError();
  }
}

// получение айтема по id
async function requestToGetItem(id) {
  try {
    await api.getReflection().then((data) => {
      console.log(data);
      // show item page
    });
  } catch (err) {
    onRequestError();
  }
}

// удаление айтема по id
async function requestToDeleteItem(id) {
  try {
    await api.deleteReflection(id);
    await api.getReflections().then((data) => {
      renderItems(data);
    });
  } catch (err) {
    onRequestError();
  }
}

requestToGetItems();
