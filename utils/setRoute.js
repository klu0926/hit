export function getRouteUrl(hashRoute = '#/') {
  const path = window.location.pathname;
  let base = '/';

  // Check if this is on GitHub Pages
  if (path.includes('/hit/')) {
    base = '/hit/';
  }
  return `${window.location.origin}${base}${hashRoute}`;
}

export function setRoute(hashRoute = '#/') {
  window.location.replace(getRouteUrl(hashRoute));
}
