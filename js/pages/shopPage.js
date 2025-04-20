// logic
import { isAuth } from "../modules/authentication.js";
import { generateItems } from "./shopPageItems.js";
import { setRoute } from "../../utils/setRoute.js";

// element
import { navbar } from "../components/navbar.js";
import { updateProgressbar } from "../components/progressbar.js";
import { notification } from "../modules/notification.js"
import { backgroundCover } from "../components/backgroundCover.js"
import { footer } from "../components/footer.js";
import { sidebar } from "../components/sidebar.js";

// player
import { getLocalTokenPlayer, setTokenPlayer } from "../modules/storage.js";

let items = []// fetched
let itemsDiv
let buyMenu

export async function shopPage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      setRoute('#/login')
    }
    // clear
    app.innerHTML = ''

    // Background Cover
    const _backgroundCover = backgroundCover('shop')
    app.appendChild(_backgroundCover);

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

    // footer 
    const _footer = footer()
    app.appendChild(_footer)

    // render
    renderShopItems()

  }
  catch (err) {
    console.error("[ERROR] shopPage", err)
  }
}

function renderShopItems(renew = false) {
  if (!itemsDiv) {
    console.error('[ERROR] renderShopItems: No itemsDiv')
  }
  // player
  const player = getLocalTokenPlayer()

  // clear
  itemsDiv.innerHTML = ''

  // if has items in shop
  if (player.shop?.length > 0 && !renew) {
    // use old items
    items = player.shop
  } else {
    getNewItems()
  }

  // render each item
  items.forEach(item => {
    const itemDiv = document.createElement('div')
    itemDiv.classList.add('item-div')

    // check if sold
    if (item.sold) {
      itemDiv.classList.add('sold')
    }

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

    // sidebar
    sidebar()

    // Event
    itemDiv.addEventListener('click', () => {
      renderBuyMenu(item)
    })
  })
}

function renderBuyMenu(item) {
  removeBuyMenu()

  buyMenu = document.createElement('div')
  buyMenu.id = 'buy-menu'
  itemsDiv.appendChild(buyMenu)

  const itemName = document.createElement('p')
  itemName.innerText = item?.name || "Name"
  itemName.classList.add('buy-menu-name')
  buyMenu.appendChild(itemName)

  const itemPrice = document.createElement('p')
  itemPrice.innerText = "$" + (item?.price || "999999")
  itemPrice.classList.add('buy-menu-price')
  buyMenu.appendChild(itemPrice)

  const close = document.createElement('button')
  close.innerText = 'X'
  close.type = 'button'
  close.classList.add('buy-menu-close')
  buyMenu.appendChild(close)

  const buy = document.createElement('button')
  buy.innerText = 'Purchase'
  buy.type = 'button'
  buy.classList.add('buy-menu-buy')
  buyMenu.appendChild(buy)

  // Event
  close.addEventListener('click', removeBuyMenu)
  buy.addEventListener('click', () => { buyItem(item) })
}

function removeBuyMenu() {
  if (buyMenu) {
    buyMenu.remove()
    buyMenu = null
  }
}

function buyItem(item) {
  // check if player has money
  const player = getLocalTokenPlayer()
  if (player.gold < item.price) {
    notification("Insufficient funds")
    return
  }
  // set the item to be sold = true
  item.sold = true

  // store item to player.gear
  player.gears = [...player.gears, item] || [item]

  // updatre item in player.shop
  const shopItems = player.shop
  const oldItem = shopItems.find(i => Number(i.id) == Number(item.id))
  oldItem.sold = true

  // cost money
  player.gold -= item.price

  // store player
  setTokenPlayer(player)

  // render shop page
  renderShopItems()

  // close buyItem menu
  removeBuyMenu()

  // notification
  notification("Purchase Complete", false)
}

// force shop to change new items
export function getNewItems() {
  items = generateItems()
  const player = getLocalTokenPlayer()
  player.shop = items
  setTokenPlayer(player)

}