// logic
import { isAuth } from "../modules/authentication.js";
import { setRoute } from "../../utils/setRoute.js";

// element
import { navbar } from "../components/navbar.js";
import { updateProgressbar } from "../components/progressbar.js";
import { backgroundCover } from "../components/backgroundCover.js";
import { footer } from "../components/footer.js";


export async function rulesPage(app) {
  try {
    // player is not login
    const plalyer = isAuth()
    if (!plalyer) {
      setRoute('#login')
    }
    // clear
    app.innerHTML = ''

    // Background Cover
    const _backgroundCover = backgroundCover('rules')
    app.appendChild(_backgroundCover);

    // navbar
    const _navbar = navbar('rules')
    app.appendChild(_navbar)
    updateProgressbar()

    // page
    const page = document.createElement('div')
    page.classList.add('page', 'rules-page')
    app.appendChild(page)

    // show page title
    const title = document.createElement('h1')
    title.innerText = 'RULES'
    title.classList.add('title')
    page.appendChild(title)

    // page content
    const content = document.createElement('div')
    content.classList.add('rules-content')
    page.appendChild(content)
    content.innerHTML = `
<section>
  <p><span class="rule-title">HIT</span></p>
  <p>Your objective is simple — <span class='keyword'>eliminate rival agents</span> and climb the ranks. Survival is secondary. Legacy is everything.</p>
  <p>To perform a <span class="keyword">HIT</span>, access the <span class="keyword">Agents</span> tab. Select a target. Confirm the strike. Walk away clean.</p>
</section>

  <section>
  <p><span class="rule-title">OUTCOMES</span></p>
  <p>• <span class="keyword">Win</span> – Target terminated. Gain gold. Take their rank. +1 Day.</p>
  <p>• <span class="keyword">Lose + Survive</span> – No change. +1 Day.</p>
  <p>• <span class="keyword">Lose + Die</span> – Agent terminated. Profile purged.</p>
  </section>

  <section>
  <p><span class="rule-title">STATS</span></p>
  <p>• <span class="stat stat-leth">Lethality</span> – Determines kill chance.</p>
  <p>• <span class="stat stat-sur">Survival</span> – Determines survival if you lose.</p>
  <p>• <span class="stat stat-cool">Cool</span> – Boosts gold earned per HIT.</p>
  </section>

  <section>
  <p><span class="rule-title">SHOP</span></p>
  <p>Use gold to upgrade weapons, gear, and armor. Improve odds. Stay lethal.</p>
  </section>

  <section>
  <p><span class="rule-title">DAYS:</span></p>
  <p>Each combat passes one day. Shop restocks. Enemies grow stronger.</p>
  </seciton>
    `

    // footer 
    const _footer = footer()
    app.appendChild(_footer)
  }
  catch (err) {
    console.error("[ERROR] rulesPage", err)
  }
}