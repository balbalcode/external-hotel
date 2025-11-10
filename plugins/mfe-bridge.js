export default ({ app }) => {
  if (!process.client) return;

  window.dispatchEvent(new CustomEvent("legacy:ready", {
    detail: { path: app.router.currentRoute.fullPath }
  }));

  app.router.afterEach((to, from) => {
    if (to.fullPath !== from.fullPath) {
      window.dispatchEvent(new CustomEvent("legacy:navigate", {
        detail: { path: to.fullPath }
      }));
    }
  });

  window.addEventListener("host:navigate", (e) => {
    const path = e?.detail?.path;
    if (typeof path === "string" && app.router.currentRoute.fullPath !== path) {
      app.router.push(path);
    }
  });
};
