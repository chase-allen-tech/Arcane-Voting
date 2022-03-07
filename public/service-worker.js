self.addEventListener("push", (event) => {
  const data = event.data.json();
  const { title, image, body } = data;

  const options = {
    body,
    icon: `https://arcaneuniverse.com/uploads/${image}`,
    image: `https://arcaneuniverse.com/uploads/${image}`,
    requireInteraction: true,
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
