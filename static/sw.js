const cacheName = 'derp'

self.addEventListener('fetch', evt => {
  if (evt.request.url === 'http://localhost:3000/') {
    evt.respondWith(
      fromCache('/shell.html')
    )
  }
  if (evt.request.url.includes('/posts/frontend')) {
    evt.respondWith(
      fromCache('/shell.html')
    )
  }
  if (evt.request.url.includes('/main.js')) {
    evt.respondWith(
      fromCache('/main.js')
    )
  }
  if (evt.request.url.includes('/0.main.js')) {
    evt.respondWith(
      fromCache('/0.main.js')
    )
  }
})

self.addEventListener('install', evt => {
  evt.waitUntil(precache());
})

function precache() {
  return caches.open(cacheName)
    .then(cache => (
      cache.addAll([
        '/shell.html',
        '/main.js',
        '/0.main.js'
      ])
    ))
}

function fromNetwork(request, timeout) {
  return new Promise((fulfill, reject) => {
    timeoutId = setTimeout(reject, timeout);

    fetch(request)
      .then(response => {
        clearTimeout(timeoutId)
        fulfill(response)
      })
      .catch(reject)
  })
}

function fromCache(request) {
  return caches.open(cacheName)
    .then(cache => (
      cache.match(request)
        .then(matching => matching)
    ))
}
