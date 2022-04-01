import React from "react";
import { AxiosRequestConfig } from "axios";
import EndpointType from "../components/Form/definitions/EndpointType";
import { FormikValues } from "formik";

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

const resolveEndpoint = (parameter: EndpointType, values: FormikValues): undefined | AxiosRequestConfig => {
    const resolved = typeof parameter === "function" ? parameter(values) : parameter;

    if (typeof resolved === "string") {
        return {
            url: resolved,
        };
    }

    return resolved;
};

export {
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
    resolveEndpoint,
};
