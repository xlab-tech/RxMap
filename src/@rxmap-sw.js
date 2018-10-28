
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js');

// fonts.googleapis.com
const staticFiles = [
  /(.+|)chunk.+.(js|css)$/,
  new RegExp('.+leaflet.+(.css$|.js$)'),
  new RegExp('.+arcgis.+(.css$|.js$|json$)'),
  new RegExp('.+js.arcgis.com.+'),
  new RegExp('.+fonts.gstatic.com.+'),
  new RegExp('.+googleapis.com.+js.+'),
];
const imageFiles = [
  new RegExp('.+leaflet.+(.png$|.jpg$)'),
  new RegExp('.+gstatic.+(.png$|.jpg$|.cur$)'),
  new RegExp('.+arcgis.com.+(.png$|.jpg$|.cur$|.woff2$|.ttf.+)'),
];

const addStaticRoute = reg => workbox.routing.registerRoute(
  reg,
  workbox.strategies.staleWhileRevalidate(),
);

if (workbox) {
  console.log('Yay! Workbox is loaded 🎉');
  staticFiles.forEach(reg => addStaticRoute(reg));
  imageFiles.forEach((reg) => {
    workbox.routing.registerRoute(
      reg,
      workbox.strategies.staleWhileRevalidate({
        cacheName: 'images',
      }),
    );
  });
  workbox.routing.registerRoute(
    new RegExp('.+tile.osm.org.+.png$'),
    workbox.strategies.cacheFirst({
      cacheName: 'osmtiles',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 36000,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
  workbox.routing.registerRoute(
    new RegExp('.+googleapis.com.+vt.+'),
    workbox.strategies.cacheFirst({
      cacheName: 'googletiles',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 36000,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
  workbox.routing.registerRoute(
    new RegExp('.+arcgisonline.com.+tile.+'),
    workbox.strategies.cacheFirst({
      cacheName: 'esritiles',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxEntries: 36000,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    }),
  );
} else {
  console.log('Boo! Workbox didn\'t load 😬');
}

self.addEventListener('message', (event) => {
  console.log('SW Received Message: ' + event.data);
  console.log(event);
  if (event.data.type === 'static') {
    addStaticRoute(event.data.reg);
  }
});
