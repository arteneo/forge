import React from "react";
import FieldsInterface from "../components/Form/definitions/FieldsInterface";
import { FormikValues, getIn } from "formik";

export const renderField = (fields: FieldsInterface) => {
    // eslint-disable-next-line
    return (field: string, props: any = {}) => {
        if (typeof fields?.[field] === "undefined") {
            throw new Error("Missing '" + field + "' field definition");
        }

        return React.cloneElement(
            fields[field],
            Object.assign(props, {
                key: field,
                name: fields[field].props.name || field,
            })
        );
    };
};

export const filterInitialValues = (
    fields: FieldsInterface,
    initialValues?: FormikValues,
    loadedInitialValues?: FormikValues
): FormikValues => {
    const values: FormikValues = {};

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        if (typeof field?.props?.fields !== "undefined") {
            // Collection field
            const collectionValues: FormikValues[] = getIn(
                loadedInitialValues,
                fieldName,
                getIn(initialValues, fieldName, [])
            );
            values[fieldName] = collectionValues
                .map((collectionValue) => filterInitialValues(field?.props?.fields, collectionValue))
                .filter((collectionValue) => Object.keys(collectionValue).length > 0);
            return;
        }

        const value = getIn(loadedInitialValues, fieldName, getIn(initialValues, fieldName, undefined));
        if (typeof value !== "undefined") {
            values[fieldName] = value;
        }
    });

    return values;
};

export const transformInitialValues = (fields: FieldsInterface, initialValues: FormikValues): FormikValues => {
    const values: FormikValues = Object.assign({}, initialValues);

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        if (typeof field?.props?.fields !== "undefined") {
            // Collection field
            const collectionValues: undefined | FormikValues[] = getIn(initialValues, fieldName, undefined);

            if (typeof collectionValues !== "undefined") {
                values[fieldName] = collectionValues.map((collectionValue) =>
                    transformInitialValues(field?.props?.fields, collectionValue)
                );
            }
            return;
        }

        if (typeof field?.props?.transformInitialValue !== "undefined") {
            values[fieldName] = field?.props?.transformInitialValue(getIn(initialValues, fieldName));
        }
    });

    return values;
};
