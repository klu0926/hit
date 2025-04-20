import { progressbar } from './progressbar.js'
import { getRouteUrl } from '../../utils/setRoute.js'

let _navbar
let _navLinks // all pages


// for mobile 
// hide NavLink by default
let _isNavLinkHidden = true
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
  agentLink.href = getRouteUrl('#/agents')
  if (currentPage === 'agents') agentLink.classList.add('active');
  agentLink.innerHTML = `<i class="fa-solid fa-earth-asia"></i> AGENTS`;
  agentList.appendChild(agentLink);
  _navLinks.appendChild(agentList);

  // Shop page
  const shopList = document.createElement('li');
  const shopLink = document.createElement('a');
  shopLink.href = getRouteUrl('#/shop')
  if (currentPage === 'shop') shopLink.classList.add('active');
  shopLink.innerHTML = `<i class="fa-regular fa-credit-card"></i> SHOP`;
  shopList.appendChild(shopLink);
  _navLinks.appendChild(shopList);

  // Rules page
  const rulesList = document.createElement('li');
  const rulesLink = document.createElement('a');
  rulesLink.href = getRouteUrl('#/rules')
  if (currentPage === 'rules') rulesLink.classList.add('active');
  rulesLink.innerHTML = `<i class="fa-solid fa-book"></i> RULES`;
  rulesList.appendChild(rulesLink);
  _navLinks.appendChild(rulesList);

  // append progress bar
  _navbar.appendChild(progressbar())

  // check if the navLink was open before
  if (!_isNavLinkHidden) {
    showNavLink()
  } else {
    hideNavLink()
  }

  // Event
  _burger.addEventListener('click', toggleNavLink)

  // check click out side while menu open 
  document.addEventListener('click', (e) => {
    // menu is hidden
    if (_isNavLinkHidden) return

    // check click inside
    const clickedInsideBurger = _burger.contains(e.target);
    const clickedInsideNav = _navLinks.contains(e.target);
    if (clickedInsideBurger || clickedInsideNav) return;

    // click outside : hide menu
    toggleNavLink()
  })

  // scroll to top when change page
  const links = [shopLink, agentLink, rulesLink]
  links.forEach(l => {
    l.addEventListener('click', scrollToTop)
  })


  return _navbar;
}

function toggleNavLink() {
  if (_isNavLinkHidden) {
    showNavLink()
  } else {
    hideNavLink()
  }
}

function showNavLink() {
  _navLinks.classList.add('show')
  _burger.classList.add('show')
  _isNavLinkHidden = false
}

function hideNavLink() {
  _navLinks.classList.remove('show')
  _burger.classList.remove('show')
  _isNavLinkHidden = true
}


function scrollToTop() {
  window.scrollTo(0, 0)
}