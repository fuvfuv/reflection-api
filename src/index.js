import ApiClient from './data/http-client.js';
import ListItem from './view/list-item';
import PopupForm from './view/popupForm';
import PageForm from './view/pageForm';
import PageItem from './view/pageItem';
// константы
import {URL} from './constants';

const newItemBtn = document.querySelector(`.nav-link-new-item`);
const listOfItems = document.querySelector(`.nav-link-list`);

newItemBtn.addEventListener(`click`, () => {
  document.location.assign(URL.FORM);
});

listOfItems.addEventListener(`click`, () => {
  document.location.assign(URL.INDEX);
});

const api = new ApiClient();
const itemsContainer = document.querySelector(`.list`);

if (window.location.pathname.includes(URL.FORM)) {
  const pageForm = new PageForm();
  pageForm.onSubmit = (newData) => {
    requestToCreateItem(newData);
  };
}

if (window.location.pathname.includes(URL.INDEX)) {
  const data = requestToGetItems();
  data.then((items) => {
    renderItems(items);
    if (items.length === 0) {
      document.location.assign(URL.FORM);
    }
  });
}

const updateData = (item, newData, itemComponent) => {
  // item = Object.assign(item, newData);
  requestToUpdateItem(item.id, newData);
  itemComponent.update(newData);
};

const renderItems = (items) => {
  itemsContainer.innerHTML = ``;

  for (let item of items) {
    const itemComponent = new ListItem(item);
    const popupFormComponent = new PopupForm(item);
    itemsContainer.appendChild(itemComponent.render());

    itemComponent.onBtnOpen = () => {
      // id могу получить только кликнув по компоненту
      window.location.href = URL.ITEM;
      setTimeout(() => {
        console.log(1);
      });
    };

    itemComponent.onBtnEdit = () => {
      itemsContainer.appendChild(popupFormComponent.render());
    };

    itemComponent.onBtnDelete = (id) => {
      requestToDeleteItem(id);
    };

    popupFormComponent.onBtnSave = (newData) => {
      updateData(item, newData, itemComponent);
      popupFormComponent.unrender();
    };

    popupFormComponent.onBtnClose = () => {
      popupFormComponent.unrender();
    };
  }
};

const onRequestError = (err) => {
  console.log(`Error in request`, err);
};

// запрос на создание нового айтема
async function requestToCreateItem(newData) {
  try {
    await api.createReflection(newData);
  } catch (err) {
    onRequestError(err);
  }
}

// запрос на обновление айтема
async function requestToUpdateItem(id, newData) {
  // console.log(newData);
  try {
    await api.updateReflection(id, newData);
    const data = await api.getReflections();
    // console.log(`Обновленные данныx`, data);
    renderItems(data);
  } catch (err) {
    onRequestError();
  }
}

// получение всех айтемов
async function requestToGetItems() {
  try {
    return await api.getReflections();
  } catch (err) {
    onRequestError();
  }
}

// получение айтема по id
async function requestToGetItem(id) {
  try {
    const data = await api.getReflections();
    // redirect to item page
  } catch (err) {
    onRequestError();
  }
}

// удаление айтема по id
async function requestToDeleteItem(id) {
  try {
    await api.deleteReflection(id);
    const data = await api.getReflections();
    renderItems(data);
  } catch (err) {
    onRequestError();
  }
}

