export function setRoute(hashRoute = '#/') {
  const path = window.location.pathname;
  let base = '/';

  // check is this is on github page
  if (path.includes('/hit/')) {
    base = '/hit/';
  }

  // change location
  window.location.replace(`${window.location.origin}${base}${hashRoute}`);
}

setRoute('#/login');