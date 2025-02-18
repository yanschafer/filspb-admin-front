import { LogLevel } from "@/utils/logger/log-level";

export default {
    // proto: "https",
    // endpoint: 'filspb.dudosyka.ru',
    proto: "http",
    endpoint: 'localhost:8090',
    refreshEndpoint: "/auth/refresh",
    loggerLevel: LogLevel.DEBUG,
    loggerExcludedPrefixes: [],
    showStackTrace: false,
}