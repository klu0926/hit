// combine API fetching, local storage saving, router



async function appStart() {
  // 1. fetch data from API
  console.log('fetching data...')

  // 2. storage to localstorage
  console.log('store data to localstorage')

  // 3. router start : render whatever page this is with component
  console.log('router trigger')
}

document.addEventListener('DOMContentLoaded', async () => {
  await appStart();
})
