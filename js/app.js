// combine API fetching, local storage saving, router
import { router } from './router.js'

async function appStart() {
  router()
  window.addEventListener('hashchange', router)
}

// RUN
document.addEventListener('DOMContentLoaded', async () => {
  await appStart();
})
