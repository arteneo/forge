import React from "react";
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

const resolveUpdatedValidationSchema = (
    validationSchema: any | (() => any),
    resolvedHidden: boolean,
    resolvedRequired: boolean
): any | (() => any) => {
    if (resolvedHidden) {
        return null;
    }

    if (resolvedRequired) {
        validationSchema.required("validation.required");
    } else {
        validationSchema.notRequired();
    }
};

export {
    resolveAnyOrFunction,
    resolveBooleanOrFunction,
    resolveStringOrFunction,
    resolveReactNodeOrFunction,
    resolveUpdatedValidationSchema,
};
