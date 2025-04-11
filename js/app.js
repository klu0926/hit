// combine API fetching, local storage saving, router
import { router } from './router.js'
import { createAccount } from './api/reqresIn.js'

createAccount('lulu', '123')

async function appStart() {
  router()
  window.addEventListener('hashchange', router)
}

// RUN
document.addEventListener('DOMContentLoaded', async () => {
  await appStart();
})
