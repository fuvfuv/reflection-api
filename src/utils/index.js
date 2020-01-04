export const redirectTo = (url) => {
  window.location.assign(url);
};

export const onRequestError = (err) => {
  window.console.log(`Error in request`, err);
};
