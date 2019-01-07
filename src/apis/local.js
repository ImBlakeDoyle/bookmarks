import axios from "axios";
import JWT from "jsonwebtoken";

const LocalApi = axios.create({
    baseURL: "http://localhost:3000"
});

LocalApi.setAuthHeader = function(token) {
    this.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

LocalApi.handleTokenError = function(callback){
    LocalApi.interceptors.request.use(function(config) {
        const authHeader = config.headers.common.Authorization;

        if (authHeader) {
            const token = authHeader.split("Bearer ")[1];
            const { exp } = JWT.decode(token);
            const now = Date.now().valueOf() / 1000;

            if (exp <= now) {
                callback();
                return Promise.reject("Token expired");
            }
        }
        return config;
    });
};

export default LocalApi;