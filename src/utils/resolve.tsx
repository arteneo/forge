import React from "react";
import { AxiosRequestConfig } from "axios";
/* eslint-disable */

const resolveBooleanOrFunction = (parameter: undefined | boolean | Function, ...functionParameters: any[]): boolean => {
    if (typeof parameter === "function") {
        return parameter(...functionParameters);
    }

    return Boolean(parameter);
};

const resolveStringOrFunction = (parameter: string | Function, ...functionParameters: any[]): string => {
    if (typeof parameter === "function") {
        return parameter(...functionParameters);
    }

    return parameter;
};

const resolveAnyOrFunction = (parameter: any, ...functionParameters: any[]): any => {
    if (typeof parameter === "function") {
        return parameter(...functionParameters);
    }

    return parameter;
};

const resolveReactNodeOrFunction = (
    parameter: undefined | React.ReactNode | Function,
    ...functionParameters: any[]
): undefined | React.ReactNode => {
    if (typeof parameter === "function") {
        return parameter(...functionParameters);
    }

    return parameter;
};

const resolveAxiosRequestConfigOrFunction = (
    parameter: undefined | AxiosRequestConfig | Function,
    ...functionParameters: any[]
): undefined | AxiosRequestConfig => {
    if (typeof parameter === "function") {
        return parameter(...functionParameters);
    }

    return parameter;
};

export {
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
};
