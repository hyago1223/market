import config from "../config";

const adminConfig = {
    URL: config.URL,
    port: config.port,
    apiURL: `${config.URL}admin/api/`,
    apiVersion: 'v-1.0.0',
}

export default adminConfig;