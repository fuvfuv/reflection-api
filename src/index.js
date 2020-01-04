import ListItem from './view/list-item';
import PopupForm from './view/popupForm';
import PageForm from './view/pageForm';
import PageItem from './view/pageItem';

// константы
import {URL} from './constants';
// утилиты
import {redirectTo} from './utils';
// запросы
import {requestToCreateItem,
  requestToUpdateItem,
  requestToGetItem,
  requestToGetItems,
  requestToDeleteItem} from './data/requests';


const itemsContainer = document.querySelector(`.list`);
const newItemBtn = document.querySelector(`.nav-link-new-item`);
const listOfItems = document.querySelector(`.nav-link-list`);

const onNewItemClick = () => {
  redirectTo(URL.FORM);
};

const onListOfItemsClick = () => {
  redirectTo(URL.INDEX);
};

const updateData = (item, newData, itemComponent) => {
  item = Object.assign(item, newData);
  requestToUpdateItem(item.id, newData, renderItems);
  itemComponent.update(newData);
};

const renderItems = (items) => {
  itemsContainer.innerHTML = ``;

  for (let item of items) {
    const itemComponent = new ListItem(item);

    const popupFormComponent = new PopupForm(item);
    itemsContainer.appendChild(itemComponent.render());

    itemComponent.onBtnOpen = (id) => {
      redirectTo(`${URL.ITEM}#id=${id}`);
    };

    itemComponent.onBtnEdit = () => {
      itemsContainer.appendChild(popupFormComponent.render());
    };

    itemComponent.onBtnDelete = (id) => {
      requestToDeleteItem(id, renderItems);
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

const renderIndexPage = () => {
  requestToGetItems().then((items) => {
    if (items.length === 0) {
      redirectTo(URL.FORM);
    } else {
      renderItems(items);
    }
  });
};

const renderFormPage = () => {
  const pageForm = new PageForm();
  pageForm.onSubmit = (newData) => {
    requestToCreateItem(newData);
  };
};

const renderItemPage = () => {
  const url = window.location.href;
  let id = url.substring(url.lastIndexOf(`#id=`) + 4);

  requestToGetItem(id).then((item) => {
    const itemPage = new PageItem(item);
    itemPage.render();
  });
};

newItemBtn.addEventListener(`click`, onNewItemClick);
listOfItems.addEventListener(`click`, onListOfItemsClick);

const pageMapper = {
  [URL.INDEX]: renderIndexPage,
  [URL.FORM]: renderFormPage,
  [URL.ITEM]: renderItemPage
};

pageMapper[window.location.pathname]();
