// Listen before the application module and manifest finish loading, including on Android.
(() => {
  const state = window.speakoraInstallation = { event: null, installed: false };
  const notify = () => window.dispatchEvent(new Event('speakora:installationchange'));
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    if (!state.installed) state.event = event;
    notify();
  });
  window.addEventListener('appinstalled', () => {
    state.installed = true;
    state.event = null;
    notify();
  });
})();
