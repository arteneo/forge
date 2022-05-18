import React from "react";
import { AxiosRequestConfig } from "axios";
import { FormikValues } from "formik";
import FieldEndpointType from "../components/Form/definitions/FieldEndpointType";
import FieldAutocompleteEndpointType from "../components/Form/definitions/FieldAutocompleteEndpointType";
import EndpointType from "../definitions/EndpointType";

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

const resolveEndpoint = (endpoint: EndpointType): undefined | AxiosRequestConfig => {
    if (typeof endpoint === "string") {
        return {
            url: endpoint,
        };
    }

    return endpoint;
};

const resolveFieldEndpoint = (parameter: FieldEndpointType, values: FormikValues): undefined | AxiosRequestConfig => {
    const resolved = typeof parameter === "function" ? parameter(values) : parameter;

    return resolveEndpoint(resolved);
};

const resolveFieldAutocompleteEndpoint = (
    parameter: FieldAutocompleteEndpointType,
    inputValue: string,
    values: FormikValues
): undefined | AxiosRequestConfig => {
    const resolved = typeof parameter === "function" ? parameter(inputValue, values) : parameter;

    return resolveEndpoint(resolved);
};

export {
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveAnyOrFunction,
    resolveReactNodeOrFunction,
    resolveAxiosRequestConfigOrFunction,
    resolveEndpoint,
    resolveFieldEndpoint,
    resolveFieldAutocompleteEndpoint,
};
