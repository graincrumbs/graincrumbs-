self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  event.waitUntil(
    self.registration.showNotification(data.title || 'New order — Grain Crumbs', {
      body: data.body || 'A new order just came in.',
      icon: '/assets/icon-192.png',
      badge: '/assets/icon-192.png',
      data: { url: data.url || '/admin' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url || '/admin'));
});