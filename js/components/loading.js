let _loading
let _loadingWrapper

export function displayLoading(app) {
  if (_loadingWrapper) {
    _loadingWrapper.remove()
    _loadingWrapper = null
  }

  // loading wrapper
  _loadingWrapper = document.createElement('div')
  _loadingWrapper.classList.add('loading-wrapper')

  // image loop
  const imageLoop = document.createElement('div')
  imageLoop.classList.add('\loading-image-loop')
  _loadingWrapper.appendChild(imageLoop)

  // loading
  const loading = document.createElement('div')
  loading.classList.add('loading')
  _loadingWrapper.appendChild(loading)

  // info
  const info = document.createElement('p')
  info.innerText = 'Tracking targets'
  info.classList.add('info')
  loading.appendChild(info)

  // Append to App
  app.appendChild(_loadingWrapper)
}