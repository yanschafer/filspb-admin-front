import { LogLevel } from "@/utils/logger/log-level";

export default {
    proto: "https",
    endpoint: 'filspb.dudosyka.ru',
    refreshEndpoint: "/auth/refresh",
    loggerLevel: LogLevel.DEBUG,
    loggerExcludedPrefixes: [],
    showStackTrace: false,
}