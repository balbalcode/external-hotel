import router from "./config/router";
import { ignored_error } from "./config/ignored_error_sentry";
const webpack = require("webpack");

require("dotenv").config();

const HOST_BASE = process.env.NUXT_PUBLIC_BASE_PATH || "/hotel/";
const NUXT_PUBLIC_BASE_PATH = HOST_BASE.endsWith("/")
  ? HOST_BASE
  : HOST_BASE + "/";

var modules = {
  target: "static",
  ssr: false,

  server: {
    port: 8003,
    host: "localhost",
    timing: false,
  },
  generate: {
    fallback: "index.html",
    dir: "dist/hotel/__legacy",
  },

  head: {
    title: process.env.APP_TITLE,
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: `Konfigurasi lokasi parkir anda dengan mudah melalui ${process.env.APP_TITLE}`,
      },
      { property: "og:title", content: process.env.APP_TITLE },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `${process.env.ASSET_URL}/sm-icon.png` },
      {
        property: "og:description",
        content: `Konfigurasi lokasi parkir anda dengan mudah melalui ${process.env.APP_TITLE}`,
      },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: `${process.env.ASSET_URL}/favicon.ico`,
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/boxicons@2.1.1/css/boxicons.min.css",
      },
      {
        rel: "stylesheet",
        href: "https://spn-cdn.s3.ap-southeast-1.amazonaws.com/asset/icon-font/latest/spn-icon-font.css",
      },
    ],
  },

  loading: { color: process.env.PRIMARY_COLOR || "#FFC348" },

  css: ["@/assets/index.scss"],

  plugins: [
    "~/plugins/axios",
    "~/plugins/vuelidate",
    "~/plugins/client-plugins",
    "~/plugins/injector",
    "~/plugins/mfe-bridge",
  ],

  modules: [
    "@nuxtjs/axios",
    "@nuxtjs/sentry",
    "@nuxtjs/firebase",
    ["@nuxtjs/bootstrap-vue", { css: false }],
  ],

  sentry: {
    dsn: process.env.SENTRY_DSN || "",
    lazy: true,
    tracing: true,
    clientConfig: `~/plugins/filter-sentry.js`,
    config: {
      environment: process.env.SENTRY_ENV || "local",
      ignoreErrors: ignored_error,
      tracesSampleRate: 1,
      trackComponents: false,
      browserTracing: {},
      vueOptions: {
        trackComponents: false,
      },
    },
  },

  firebase: {
    config: {
      apiKey: process.env.FIREBASE_apiKey,
      authDomain: process.env.FIREBASE_authDomain,
      databaseURL: process.env.FIREBASE_databaseURL,
      projectId: process.env.FIREBASE_projectId,
      storageBucket: process.env.FIREBASE_storageBucket,
      messagingSenderId: process.env.FIREBASE_messagingSenderId,
      appId: process.env.FIREBASE_appId,
      measurementId: process.env.FIREBASE_measurementId,
    },
    services: {
      analytics: process.env.MODE !== "LOCAL",
    },
  },

  router: {
    base: NUXT_PUBLIC_BASE_PATH,
    middleware: "auth-bearer",
    extendRoutes(routes) {
      router.forEach(async (item) => {
        routes.push(item);
      });
      return routes;
    },
  },

  build: {
    extend(config, ctx) {
      if (!ctx.isDev) {
        config.output.chunkFilename = `[chunkhash]-v${process.env.VERSION_NUMBER}.js`;
      } else {
        config.devtool = ctx.isClient ? "source-map" : "inline-source-map";
      }
      config.resolve.alias["@utilities"] = "@/components";

      config.resolve.alias["fast-png/lib-esm"] = "fast-png/lib";
    },

    optimization: {
      splitChunks: {
        chunks: "async",
        maxSize: 75000,
      },
    },

    plugins: [
      new webpack.optimize.SplitChunksPlugin({
        name: "manifest",
        minChunks: Infinity,
      }),
    ],

    publicPath: "/__legacy/_nuxt/",
    extractCSS: true,

    transpile: ["fast-png", "iobuffer", "pako"],

    babel: {
      presets({ isServer }) {
        return [
          [
            require.resolve("@nuxt/babel-preset-app"),
            {
              loose: true,
              targets: isServer ? { node: "current" } : { esmodules: false },
              corejs: { version: 3 },
            },
          ],
        ];
      },
      plugins: [],
    },

    postcss: {
      plugins: {
        "postcss-prefix-selector": {},
      },
    },
  },

  env: {
    SENTRY_DSN: process.env.SENTRY_DSN || "",
    VERSION_CODE: process.env.VERSION_CODE || "",
    baseUrl: process.env.BASE_URL || "",
    BASE_ASSET_URL: process.env.BASE_ASSET_URL || "",
    ASSET_URL: process.env.ASSET_URL || "",
    IPL_URL: process.env.IPL_URL || "",
    MAPS_TOKEN: process.env.MAPS_TOKEN || "",
    PRIMARY_COLOR: process.env.PRIMARY_COLOR || "",
    APP_TITLE: process.env.APP_TITLE || "",
    MODE: process.env.MODE || "",
    REPORT_VERSIONS: process.env.REPORT_VERSIONS || "v3-dynamic-route",
    FRAUD_WEBHOOK: process.env.FRAUD_WEBHOOK || "",
    TEMP_API: process.env.TEMP_API || "",
    OCR_URL: process.env.OCR_URL || "",
    NUXT_PUBLIC_BASE_PATH: NUXT_PUBLIC_BASE_PATH,
  },
};

module.exports = {
  ...modules,
};
