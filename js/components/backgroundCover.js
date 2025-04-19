let _backgroundCover

export function backgroundCover(page = 'login') {

  _backgroundCover = document.createElement('div');
  _backgroundCover.classList.add('background-wrapper');

  const backgroundImage = document.createElement('div')
  backgroundImage.classList.add('background-cover');
  _backgroundCover.appendChild(backgroundImage)

  // add background image class
  let backgroundClass = '';

  if (page) {
    switch (page.toLowerCase()) {
      case 'login':
        backgroundClass = 'login-page-cover';
        break;
      case 'create':
        backgroundClass = 'create-page-cover';
        break;
      case 'rules':
        backgroundClass = 'rules-page-cover';
        break;
      case 'agents':
        backgroundClass = 'agents-page-cover';
        break;
      case 'shop':
        backgroundClass = 'shop-page-cover';
        break;
    }
  }

  if (backgroundImage && backgroundClass) {
    backgroundImage.classList.add(backgroundClass);
  }

  return _backgroundCover
}