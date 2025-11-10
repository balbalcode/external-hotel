// this is simple middleware for our routes the middleware will do
//  - check page who need access token
//  - clear alert when move the page
//  - set sentry user and context
//  - checking is current user avail to access menu or not

import jscookie from "js-cookie";

const unprotected = [
  "/login",
  "/logout",
  "/forgot",
  "/login/",
  "/logout/",
  "/forgot/",
  "/shettle",
  "/shettle/",
];
const token_stats = [null, "", undefined];

export default function ({ app, store, route }) {
  let url = $nuxt.$route.path;
  let token = jscookie.get("token");

  // force https in production
  let mode = process.env.MODE ?? "";
  if (mode === "PRODUCTION") {
    if (location.protocol !== "https:") {
      location.replace(
        `https:${location.href.substring(location.protocol.length)}`
      );
    }
  }

  if (!unprotected.includes(url)) {
    // clearing alert
    store.dispatch("modules/utility/storeUtility/clearAlert");
    store.dispatch("modules/utility/storeUtility/clearStackedDropdown");
    store.dispatch("modules/utility/storeUtility/clearSingleDropdown");

    // checking is token avail or not, if not the system will store current url as a fallback url
    if (token_stats.includes(token)) {
      jscookie.set("fallback_url", window.$nuxt.$route.path);
      window.location.href = "/login";
    } else {
      const user = JSON.parse(jscookie.get("user"));

      // setting nuxt context and user for sentry logs
      app.$sentry.setUser({ email: user.email });
      app.$sentry.setTag({ location: user.corporate });
      app.$sentry.setContext("corporate", {
        location: user.corporate,
        spot: user.spot_id,
        type: user.type,
        path: route.path,
      });

    }
  }
}
