const pharmanicPWA = "pharmanic-pwa-v1"
const assets = [
  "/",
  "/base.html",

  //CSS files
  "/static/app/css/style.css",
  "/static/app/css/all.min.css",
  "/static/app/css/owl.carousel.min.css",

  // Images files
  "/banner/b1.jpg",
  "/banner/b2a.jpg",
  "/banner/b3a.jpg",
  "/banner/b4a.jpg",
  "/banner/emptycart.jpg",
  "/banner/icon.jpg",
  "/banner/payment.jpg",
  "/banner/square_icon.jpg",

]

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches.open(pharmanicPWA).then(cache => {
      cache.addAll(assets)
    })
  )
})


self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })

  self.addEventListener("push", event => {
    let message = event.data.json();

    switch(message.type) {
      case "init":
        doInit();
        break;
      case "shutdown":
        doShutdown();
        break;
    }
  }, false);




  self.addEventListener('sync', event => {
    if (event.tag === 'my-tag-name') {
        event.waitUntil(doTheWork());
    }
});

  // self.addEventListener('notificationclick', (event) => {
  //   console.log('[Service Worker] Notification click Received.', event);
  //   event.notification.close();

  //   const launchUrl = event.action || event.notification.data.launchUrl;

  //   if (launchUrl) {
  //     event.waitUntil(clients.openWindow(launchUrl));
  //   }
  // });
