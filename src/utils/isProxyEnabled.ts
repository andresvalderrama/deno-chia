import config from "../config.ts"

export default function isProxyEnabled() {
    return config.useProxy &&
        typeof Proxy !== "undefined" &&
        typeof Reflect !== "undefined"
}