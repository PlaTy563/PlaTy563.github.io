const CACHE_NAME = 'kakeibo-cache-v1';
// キャッシュするファイルのリスト。HTMLファイル名はご自身のものに合わせてください。
const urlsToCache = [
  '/',
  '0701_step4_tags.html', // あなたのHTMLファイル名
  'icon-512.png'
];

// インストール時にキャッシュを作成
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// ファイルへのリクエスト時にキャッシュから返す
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // キャッシュがあればそれを返す
        if (response) {
          return response;
        }
        //なければネットワークから取得
        return fetch(event.request);
      }
    )
  );
});