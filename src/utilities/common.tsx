import React from "react";
import { FormikValues, getIn, setIn } from "formik";
import FieldsInterface from "../components/Form/definitions/FieldsInterface";
import ColumnsInterface from "../components/Table/definitions/ColumnsInterface";

export const getFields = <T,>(names: undefined | T[], fields: FieldsInterface): FieldsInterface => {
    const _fields: FieldsInterface = {};
    const fieldNames = typeof names === "undefined" ? Object.keys(fields) : names;

    fieldNames.forEach((fieldName) => {
        if (typeof fieldName !== "string") {
            throw new Error("Column name " + fieldName + " not supported");
        }
        if (typeof fields[fieldName] === "undefined") {
            throw new Error("Column name " + fieldName + " not supported");
        }

        _fields[fieldName] = fields[fieldName];
    });

    return _fields;
};

export const getColumns = <T,>(names: undefined | T[], columns: ColumnsInterface): ColumnsInterface => {
    const _columns: ColumnsInterface = {};
    const columnNames = typeof names === "undefined" ? Object.keys(columns) : names;

    columnNames.forEach((columnName) => {
        if (typeof columnName !== "string") {
            throw new Error("Column name " + columnName + " not supported");
        }
        if (typeof columns[columnName] === "undefined") {
            throw new Error("Column name " + columnName + " not supported");
        }

        _columns[columnName] = columns[columnName];
    });

    return _columns;
};

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
            const collectionValues: FormikValues[] = getIn(loadedInitialValues, path, getIn(initialValues, path, []));
            values = setIn(
                values,
                path,
                collectionValues
                    .map((collectionValue) => filterInitialValues(field?.props?.fields, collectionValue))
                    .filter((collectionValue) => Object.keys(collectionValue).length > 0)
            );
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
                values = setIn(
                    values,
                    path,
                    collectionValues.map((collectionValue) =>
                        transformInitialValues(field?.props?.fields, collectionValue)
                    )
                );
            }
            return;
        }

        if (typeof field?.props?.transformInitialValue !== "undefined") {
            values = setIn(values, path, field?.props?.transformInitialValue(getIn(initialValues, path)));
        }
    });

    return values;
};
