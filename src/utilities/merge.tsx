import _ from "lodash";

// This function will replace all keys on all levels that have endpointKey (by default "endpoint")
export const mergeEndpointCustomizer = (endpointKey = "endpoint") => {
    // eslint-disable-next-line
    return (objValue: any, srcValue: any, key: string) => {
        if (endpointKey !== key) {
            return undefined;
        }

        if (typeof objValue === "string" && typeof srcValue === "string") {
            return srcValue;
        }

        if (typeof objValue === "string" && typeof srcValue === "object") {
            return _.merge({ url: objValue }, srcValue);
        }

        if (typeof objValue === "object" && typeof srcValue === "string") {
            return _.merge(objValue, { url: srcValue });
        }
    };
};
