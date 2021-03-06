/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

// This service worker can be customized!
// See https://developers.google.com/web/tools/workbox/modules
// for the list of available Workbox modules, or add any other
// code you'd like.
// You can also remove this file if you'd prefer not to use a
// service worker, and the Workbox build step will be skipped.

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';
import {setCacheNameDetails} from 'workbox-core';
import {version} from '../package.json';

declare const self: ServiceWorkerGlobalScope;

setCacheNameDetails({
  prefix: 'kevins-toolbox',
  suffix: 'v'+version,
  precache: 'precache',
  runtime: 'runtime'
});


clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }: { request: Request; url: URL }) => {
    if (request.mode !== 'navigate') {
      return false;
    }

    if (url.pathname.startsWith('/_')) {
      return false;
    }

    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }

    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);



registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.png'),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({ maxEntries: 50 }),
    ],
  })
);

registerRoute(
  ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.json') && url.pathname.startsWith('/locales'),
  new StaleWhileRevalidate({
    cacheName: 'locales',
  })
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const broadcast = new BroadcastChannel('sw-updates');

broadcast.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    clientsClaim();
  }
});

self.addEventListener('install', (event) => {
  broadcast.postMessage({
    type: 'UPDATE_AVAILABLE'
  });
})

registerRoute(
  ({ url }) => url.origin === "https://images.unsplash.com",
  new StaleWhileRevalidate({
    cacheName: 'unsplashImages',
    plugins: []
  })
)

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          if (cacheName.startsWith('kevins-toolbox') && cacheName !== 'kevins-toolbox-precache-v'+version) {
            return true;
          }
          return false;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
