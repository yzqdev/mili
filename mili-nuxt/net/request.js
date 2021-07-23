import axios from "axios";
import {config} from "~/config";
import {apiConfig} from "~/config/apiConfig";
import {adminAPIConfig} from "~/config/adminAPIConfig";
import   Cookies from 'js-cookie'
const req = {};

function send(key, options) {
    return new Promise((resolve, reject) => {
        let theConfig = apiConfig[key] || adminAPIConfig[key];
        options = options || {};
        let url = theConfig.url;
        theConfig.method = theConfig.method.toLocaleLowerCase();

        if (options.params) {
            let params = options.params;
            for (let key in params) {
                if (params.hasOwnProperty(key)) {
                    url = url.replace(":" + key, params[key]);
                }
            }
        }

        if (theConfig.method === "post" || theConfig.method === "put") {
            options.body = options.body || {};
        }

        if (options.query) {
            let query = options.query;
            let queryArr = [];
            for (let key in query) {
                if (query.hasOwnProperty(key)) {
                    queryArr.push(key + "=" + query[key]);
                }
            }
            if (queryArr.length > 0) {
                url += "?" + queryArr.join("&");
            }
        }

        let axiosConfig = {
            method: theConfig.method,
            url: url,
            headers: {},
        };

        let client = options.client;
        console.log(`%coptions有点`, `color:red;font-size:16px;background:transparent`)


        if (typeof window === "undefined" && !client) {
            throw new Error(key + ": client不能为空");
        }
        console.log(`%cclient有头吗`, `color:red;font-size:16px;background:transparent`)

        if (!client) {
        // if (client && client.headers) {
            console.log(
                `%c这是头部client`,
                `color:red;font-size:16px;background:transparent`
            );
            // console.log(client.headers);
            // if (client.headers["user-agent"]) {
            //     axiosConfig.headers["User-Agent"] = client.headers["user-agent"];
            // }
            // if (client.headers["cookie"]) {
                axiosConfig.headers["Cookie"] = Cookies.get("token");
            // }
            axiosConfig.headers["token"] = Cookies.get("token");
        }

        console.log(
            `%caxios配置`,
            `color:red;font-size:16px;background:transparent`
        );
        console.log(axiosConfig);
        if (theConfig.method === "post" || theConfig.method === "put") {
            axiosConfig.data = options.body;
        }

        let startTime = new Date().getTime();
        axios(axiosConfig)
            .then(function (response) {
                if (typeof window === "undefined") {
                    console.log({
                        url: url,
                        time: new Date().getTime() - startTime + "ms",
                    });
                }
                return resolve(response.data);
            })
            .catch(function (error) {
                return reject(error);
            });
    });
}

for (let key in apiConfig) {
    if (apiConfig.hasOwnProperty(key)) {

        req[key] = (options) => {
            console.log(`%c这是options`, `color:red;font-size:16px;background:transparent`)


            return send(key, options);
        };
    }
}

for (let key in adminAPIConfig) {
    if (req.hasOwnProperty(key)) {
        throw new Error("apiConfig already has key " + key);
    }
    if (adminAPIConfig.hasOwnProperty(key)) {
        req[key] = (options) => {
            return send(key, options);
        };
    }
}

export default req;
