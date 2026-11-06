if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js').catch(err => console.warn('PWA offline support unavailable:', err)));
}
let deferredInstallPrompt;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredInstallPrompt = event;
  const install = document.createElement('button');
  install.type = 'button';
  install.className = 'pwa-install-button';
  install.textContent = 'Install Go2Havasu App';
  install.setAttribute('aria-label', 'Install Go2Havasu on this device');
  install.style.cssText = 'position:fixed;bottom:16px;right:16px;z-index:1000;border:0;border-radius:999px;background:#062b5a;color:#fff;padding:13px 18px;font:700 14px Montserrat,Arial,sans-serif;box-shadow:0 5px 18px #0004;cursor:pointer';
  document.body.appendChild(install);
  install.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    await deferredInstallPrompt.prompt();
    deferredInstallPrompt = null;
    install.remove();
  });
});
window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  document.querySelector('.pwa-install-button')?.remove();
});
