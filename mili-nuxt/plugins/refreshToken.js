import cookie from "~/utils/cookie";

export default ({ app: { router }, req, res }) => {
  console.log(`%c路由跳转请求头`,`color:red;font-size:16px;background:transparent`)
  console.log(req)
  router.afterEach((to, from) => {
    if (typeof window === "undefined") {
      cookie.refreshTokenCookie(req, res);
    }
  });
};
