module.exports = {
  server: {
    port: 8020, // default: 3000
    host: "0.0.0.0", // default: localhost
  },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  render: {
    resourceHints: false,
  },

  ssr: true,
  // router: {
  //   base: '/homemain/'
  // },
  // mode:'spa',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "static",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },
  css: ["~assets/styles/common.css"],
  loading: { color: "#80bd01" },
  performance: {
    prefetch: false,
  },

  build: {},
  plugins: [
    { src: "~plugins/iview.js", ssr: true },
    { src: "~plugins/bdStat.js", ssr: false },
    { src: "~plugins/adsense.js", ssr: false },
    { src: "~plugins/refreshToken.js", ssr: true },
  ],
};
