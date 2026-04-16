self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || "占いデイリー"
  const options = {
    body: data.body || "今日の運勢が更新されました",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    data: { url: data.url || "/horoscope" },
  }
  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  const url = event.notification.data?.url || "/horoscope"
  event.waitUntil(clients.openWindow(url))
})
