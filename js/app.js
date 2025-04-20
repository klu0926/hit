// combine API fetching, local storage saving, router
import { router } from './router.js'

async function appStart() {
  router()
  window.addEventListener('hashchange', () => {
    router()
    window.scrollTo(0, 0);
  })
}

// RUN
document.addEventListener('DOMContentLoaded', async () => {
  await appStart();
})
