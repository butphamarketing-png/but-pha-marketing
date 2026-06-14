self.addEventListener("push", (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { title: "Bứt Phá Marketing", body: event.data?.text() || "Có thông báo mới" };
  }

  const title = payload.title || "Bứt Phá Marketing";
  const options = {
    body: payload.body || "",
    icon: payload.icon || "/tin-tuc/tin-tuc-marketing.png",
    badge: "/favicon.png",
    data: { url: payload.url || "/blog" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || "/blog";

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client && client.url.includes(new URL(targetUrl, self.location.origin).pathname)) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(targetUrl);
      }
      return undefined;
    }),
  );
});
