import ApiClient from './http-client.js';
const api = new ApiClient();

// запрос на создание нового айтема
export async function requestToCreateItem(newData) {
  try {
    return await api.createReflection(newData);
  } catch (err) {
    window.console.log(`Не удалось создать новую сущность`);
  }
}

// запрос на обновление айтема
export async function requestToUpdateItem(id, newData, renderItems) {
  try {
    await api.updateReflection(id, newData);
    let items = await api.getReflections();
    renderItems(items);
  } catch (err) {
    window.console.log(`Не удалось произвести запрос на обновление сущности`);
  }
}

// // получение айтема по id
export async function requestToGetItem(id) {
  try {
    const item = await api.getReflection(id);
    return item;
  } catch (err) {
    window.console.log(`Не удалось загрузить сущность по id`);
  }
}
// получение всех айтемов
export async function requestToGetItems() {
  try {
    let items = await api.getReflections();
    return items;
  } catch (err) {
    window.console.log(`Не удалось загрузить данные`);
  }
}

// удаление айтема по id
export async function requestToDeleteItem(id, renderItems) {
  try {
    await api.deleteReflection(id);
    let items = await api.getReflections();
    renderItems(items);
  } catch (err) {
    window.console.log(`Не удалось удалить сущность по id`);
  }
}
