import React from "react";
import { FormikValues, getIn, setIn } from "formik";
import FieldsInterface from "../components/Form/definitions/FieldsInterface";
import ColumnsInterface from "../components/Table/definitions/ColumnsInterface";

export const pickFields = (
    names: undefined | string[],
    skipNames: undefined | string[],
    fields: FieldsInterface
): FieldsInterface => {
    const _fields: FieldsInterface = {};
    const fieldNames = typeof names === "undefined" ? Object.keys(fields) : names;

    fieldNames.forEach((fieldName) => {
        if (typeof fieldName !== "string") {
            throw new Error("Column name " + fieldName + " not supported");
        }
        if (typeof fields[fieldName] === "undefined") {
            throw new Error("Column name " + fieldName + " not supported");
        }
        if (typeof skipNames !== "undefined" && skipNames.includes(fieldName)) {
            return;
        }

        _fields[fieldName] = fields[fieldName];
    });

    return _fields;
};

export const getFields = (fields: FieldsInterface) => (names?: string[], skipNames?: string[]) =>
    pickFields(names, skipNames, fields);

export const pickColumns = (
    names: undefined | string[],
    skipNames: undefined | string[],
    columns: ColumnsInterface
): ColumnsInterface => {
    const _columns: ColumnsInterface = {};
    const columnNames = typeof names === "undefined" ? Object.keys(columns) : names;

    columnNames.forEach((columnName) => {
        if (typeof columnName !== "string") {
            throw new Error("Column name " + columnName + " not supported");
        }
        if (typeof columns[columnName] === "undefined") {
            throw new Error("Column name " + columnName + " not supported");
        }
        if (typeof skipNames !== "undefined" && skipNames.includes(columnName)) {
            return;
        }

        _columns[columnName] = columns[columnName];
    });

    return _columns;
};

export const getColumns = (columns: ColumnsInterface) => (names?: string[], skipNames?: string[]) =>
    pickColumns(names, skipNames, columns);

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
    let values: FormikValues = {};

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        const path = field?.props?.path ?? fieldName;

        if (typeof field?.props?.fields !== "undefined") {
            // Collection field
            const collectionValues: FormikValues[] = getIn(loadedInitialValues, path, getIn(initialValues, path, {}));
            const filtered = {};

            Object.keys(collectionValues).forEach((id) => {
                const collectionValue = collectionValues[id];
                filtered[id] = filterInitialValues(field?.props?.fields, collectionValue);
            });

            values = setIn(values, path, filtered);
            return;
        }

        const value = getIn(loadedInitialValues, path, getIn(initialValues, path, undefined));
        if (typeof value !== "undefined") {
            values = setIn(values, path, value);
        }
    });

    return values;
};

export const transformInitialValues = (fields: FieldsInterface, initialValues: FormikValues): FormikValues => {
    let values: FormikValues = Object.assign({}, initialValues);

    Object.keys(fields).forEach((fieldName) => {
        const field = fields[fieldName];
        const path = field?.props?.path ?? fieldName;

        if (typeof field?.props?.fields !== "undefined") {
            // Collection field
            const collectionValues: undefined | FormikValues[] = getIn(initialValues, path, undefined);

            if (typeof collectionValues !== "undefined") {
                Object.keys(collectionValues).forEach((key) => {
                    collectionValues[key] = transformInitialValues(field?.props?.fields, collectionValues[key]);
                });

                values = setIn(values, path, collectionValues);
            }
            return;
        }

        if (typeof field?.props?.transformInitialValue !== "undefined") {
            values = setIn(values, path, field?.props?.transformInitialValue(getIn(initialValues, path)));
        }
    });

    return values;
};

export const responseHeaderExtractFilename = (contentDisposition: string): undefined | string => {
    // Complex regex that detects filename from content-disposition header
    // There are multiple ways that filename might be sent in this content-disposition header
    if (contentDisposition && contentDisposition.indexOf("attachment") !== -1) {
        const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        const matches = filenameRegex.exec(contentDisposition);
        if (matches != null && matches[1]) {
            return matches[1].replace(/['"]/g, "");
        }
    }

    return undefined;
};
