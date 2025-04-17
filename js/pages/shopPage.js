// logic
import { isAuth } from "../modules/authentication.js";
import { generateItems } from "./shopPageItems.js";

// element
import { navbar, updateProgressbar } from "../components/navbar.js";

let itemsDiv


export async function shopPage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      window.location.hash = '#/login'
    }
    // clear
    app.innerHTML = ''

    // Background Cover
    const backgroundCover = document.createElement('div');
    backgroundCover.classList.add('background-cover', 'shop-page-cover');
    app.appendChild(backgroundCover);

    // navbar
    const _navbar = navbar('shop')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page', 'shop-page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'SHOP'
    title.classList.add('title')
    page.appendChild(title)

    // itemDivs
    itemsDiv = document.createElement('div')
    itemsDiv.id = 'items-div'
    page.appendChild(itemsDiv)

    // render
    renderShopItems(10)

  }
  catch (err) {
    console.error("[ERROR] shopPage", err)
  }
}

function renderShopItems() {
  if (!itemsDiv) {
    console.error('[ERROR] renderShopItems: No itemsDiv')
  }

  // clear
  itemsDiv.innerHTML = ''

  // genrate items
  const items = generateItems()

  // render each item
  items.forEach(item => {
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item-div')

    // hold icon and upperRight [type, name]
    const upperDiv = document.createElement('div')
    upperDiv.classList.add('item-upper-div')
    itemDiv.appendChild(upperDiv)

    const icon = document.createElement('div')
    icon.classList.add('item-icon')
    icon.innerHTML = item.icon
    upperDiv.appendChild(icon)

    // hold type and name
    const upperDivRight = document.createElement('div')
    upperDivRight.classList.add('item-upper-right')
    upperDiv.appendChild(upperDivRight)

    const type = document.createElement('div')
    type.classList.add('item-type')
    type.innerText = item.type
    upperDivRight.appendChild(type)

    const name = document.createElement('span')
    name.classList.add('item-name')
    name.innerText = item.name
    upperDivRight.appendChild(name)

    // stats
    const statsDiv = document.createElement('div')
    statsDiv.classList.add('stats-div')
    itemDiv.appendChild(statsDiv)

    const lethality = document.createElement('span')
    lethality.classList.add('stats-lethality')
    lethality.innerText = `LETH ${item.stats.lethality}`
    statsDiv.appendChild(lethality)

    const survival = document.createElement('span')
    survival.classList.add('stats-survival')
    survival.innerText = `SUR ${item.stats.survival}`
    statsDiv.appendChild(survival)

    const cool = document.createElement('span')
    cool.classList.add('stats-cool')
    cool.innerText = `CL ${item.stats.cool}`
    statsDiv.appendChild(cool)

    const price = document.createElement('span')
    price.classList.add('item-price')
    price.innerText = `$${item.price}`
    itemDiv.appendChild(price)

    // append to itemsDivs
    itemsDiv.appendChild(itemDiv)

  })
}