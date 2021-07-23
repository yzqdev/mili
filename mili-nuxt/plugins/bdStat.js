import { config } from "~/config";

/*
 * 引入百度统计
 */
export default ({ app: { router }, store }) => {
  router.afterEach((to, from) => {
    if (store.state.isAdminPage) {
      return;
    }
    if (
      config.bdStatSI &&
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      let _hmt = _hmt || [];
      (function () {
        let hm = document.createElement("script");
        hm.async = true;
        hm.src = `https://hm.baidu.com/hm.js?${config.bdStatSI}`;
        let s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    }
  });
};
