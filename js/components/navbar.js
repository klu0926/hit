// H.I.T. – Haunt. Infiltrate. Terminate.

export function navbar(currentPage) {
  const navbar = document.createElement('nav');
  navbar.classList.add('navbar');
  navbar.innerHTML = `
    <div class="logo">H.I.T.</div>
    <button class="burger" aria-label="Toggle navigation">
      ☰
    </button>
    <ul class="nav-links">
      <li><a href="#/agents" class="${currentPage === 'agents' ? 'active' : ''}">
      <i class="fa-solid fa-earth-asia"></i>
      AGENTS</a></li>
      <li><a href="#/shop" class="${currentPage === 'shop' ? 'active' : ''}">
<i class="fa-regular fa-credit-card"></i>
      SHOP</a></li>
      <li><a href="#/rules" class="${currentPage === 'rules' ? 'active' : ''}">
       <i class="fa-solid fa-book"></i>
      RULES</a></li>
    </ul>
  `;

  // Toggle mobile nav
  navbar.querySelector('.burger').addEventListener('click', () => {
    navbar.querySelector('.nav-links').classList.toggle('open');
  });

  return navbar;
}
