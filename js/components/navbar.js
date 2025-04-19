import { progressbar } from './progressbar.js'

let _navbar
let _navLinks // all pages

// for mobile 
// hide NavLink by default
let isNavLinkHidden = true
let _burger

export function navbar(currentPage) {
  if (_navbar) {
    _navbar.remove()
    _navbar = null
  }

  // Create new
  _navbar = document.createElement('nav');
  _navbar.classList.add('navbar');

  // Burger
  _burger = document.createElement('div');
  _burger.classList.add('burger');
  _burger.innerHTML = `
  <span></span>
  <span></span>
  <span></span>
`;
  _navbar.appendChild(_burger);

  // Nav Links (holds all pages)
  _navLinks = document.createElement('ul');
  _navLinks.classList.add('nav-links');
  _navbar.appendChild(_navLinks)

  // Agents page
  const agentList = document.createElement('li');
  const agentLink = document.createElement('a');
  agentLink.href = '#/agents';
  if (currentPage === 'agents') agentLink.classList.add('active');
  agentLink.innerHTML = `<i class="fa-solid fa-earth-asia"></i> AGENTS`;
  agentList.appendChild(agentLink);
  _navLinks.appendChild(agentList);

  // Shop page
  const shopList = document.createElement('li');
  const shopLink = document.createElement('a');
  shopLink.href = '#/shop';
  if (currentPage === 'shop') shopLink.classList.add('active');
  shopLink.innerHTML = `<i class="fa-regular fa-credit-card"></i> SHOP`;
  shopList.appendChild(shopLink);
  _navLinks.appendChild(shopList);

  // Rules page
  const rulesList = document.createElement('li');
  const rulesLink = document.createElement('a');
  rulesLink.href = '#/rules';
  if (currentPage === 'rules') rulesLink.classList.add('active');
  rulesLink.innerHTML = `<i class="fa-solid fa-book"></i> RULES`;
  rulesList.appendChild(rulesLink);
  _navLinks.appendChild(rulesList);

  // append progress bar
  _navbar.appendChild(progressbar())

  // Event
  _burger.addEventListener('click', onBurgerClick)

  // check click out side while menu open 
  document.addEventListener('click', (e) => {
    // menu is hidden
    if (isNavLinkHidden) return

    // check click inside
    const clickedInsideBurger = _burger.contains(e.target);
    const clickedInsideNav = _navLinks.contains(e.target);
    if (clickedInsideBurger || clickedInsideNav) return;

    // click outside : hide menu
    onBurgerClick()
  })

  return _navbar;
}

function onBurgerClick() {
  if (!_navLinks || !_burger) return

  if (isNavLinkHidden) {
    _navLinks.classList.add('show')
    _burger.classList.add('show')
    isNavLinkHidden = false
  } else {
    _navLinks.classList.remove('show')
    _burger.classList.remove('show')
    isNavLinkHidden = true
  }
}