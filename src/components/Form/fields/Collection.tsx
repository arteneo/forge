import React from "react";
import * as Yup from "yup";
import { FormikValues, FormikTouched, FormikErrors, FormikProps, useFormikContext, getIn } from "formik";
import {
    Box,
    FormHelperText,
    FormLabel,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useForm } from "../../../components/Form/contexts/Form";
import { resolveAnyOrFunction, resolveBooleanOrFunction } from "../../../utilities/resolve";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";

interface CollectionSpecificProps {
    fields: FieldsInterface;
    disableAddRow?:
        | ((
              value: FormikValues,
              values: FormikValues,
              path: string,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    disableDeleteRow?:
        | ((
              value: FormikValues,
              values: FormikValues,
              path: string,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    onAddRow?: (
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        values: FormikValues,
        path: string,
        defaultAddRow: () => void,
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>
    ) => void;
    onDeleteRow?: (
        key: number,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        values: FormikValues,
        path: string,
        defaultDeleteRow: () => void,
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>
    ) => void;
    initialValues?:
        | ((
              values: FormikValues,
              path: string,
              name: string,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>
          ) => FormikValues)
        | FormikValues;
}

type CollectionProps = CollectionSpecificProps & FieldInterface;

const Collection = ({
    fields,
    disableAddRow: disableAddRowProp,
    disableDeleteRow: disableDeleteRowProp,
    onAddRow,
    onDeleteRow,
    initialValues = {},
    // eslint-disable-next-line
    validate: fieldValidate = (value: any, required: boolean) => {
        if (required && !Yup.array().min(1).required().isValidSync(value)) {
            return "validate.required";
        }

        return undefined;
    },
    ...field
}: CollectionProps) => {
    const {
        values,
        touched,
        errors,
        submitCount,
        setFieldValue,
        registerField,
        unregisterField,
    }: FormikProps<FormikValues> = useFormikContext();
    const { resolveField, getLabel } = useForm();
    const { name, path, label, error, help, required, disabled, hidden, validate } = resolveField({
        values,
        touched,
        errors,
        submitCount,
        validate: fieldValidate,
        ...field,
    });

    React.useEffect(() => {
        if (hidden || typeof validate === "undefined") {
            return;
        }

        registerField(name, {
            validate: () => validate,
        });

        return () => {
            unregisterField(name);
        };
    }, [hidden, registerField, unregisterField, name, validate]);

    if (hidden) {
        return null;
    }

    const collectionRows: FormikValues[] = getIn(values, path, []);

    const addRow = () => {
        if (onAddRow) {
            onAddRow(setFieldValue, values, path, () => defaultAddRow(), name, touched, errors);
            return;
        }

        defaultAddRow();
    };

    const defaultAddRow = () => {
        collectionRows.push(resolveAnyOrFunction(initialValues, values, path, name, touched, errors));
        setFieldValue(path, collectionRows);
    };

    const deleteRow = (key: number) => {
        if (onDeleteRow) {
            onDeleteRow(key, setFieldValue, values, path, () => defaultDeleteRow(key), name, touched, errors);
            return;
        }

        defaultDeleteRow(key);
    };

    const defaultDeleteRow = (key: number) => {
        collectionRows.splice(key, 1);
        setFieldValue(path, collectionRows);
    };

    const fieldPropsOverride: FormikValues = {
        label: undefined,
        disableAutoLabel: true,
    };
    if (disabled) {
        fieldPropsOverride.disabled = true;
    }

    const disableAddRow = resolveBooleanOrFunction(
        disableAddRowProp,
        collectionRows,
        values,
        path,
        touched,
        errors,
        name
    );
    const disableDeleteRow = resolveBooleanOrFunction(
        disableDeleteRowProp,
        collectionRows,
        values,
        path,
        touched,
        errors,
        name
    );

    return (
        <div className="ForgeCollectionTable-root">
            {label && <FormLabel {...{ required }}>{label}</FormLabel>}
            {help && <FormHelperText>{help}</FormHelperText>}
            {error && <FormHelperText error>{error}</FormHelperText>}

            <Table>
                <TableHead>
                    <TableRow>
                        {Object.keys(fields).map((fieldName) => {
                            const field = fields[fieldName];
                            const fieldLabel = field?.props?.label;
                            const fieldDisableAutoLabel = field?.props?.disableAutoLabel;
                            const fieldDisableTranslateLabel = field?.props?.disableTranslateLabel;

                            const resolvedFieldLabel = getLabel(
                                fieldLabel,
                                values,
                                touched,
                                errors,
                                fieldName,
                                fieldDisableAutoLabel,
                                fieldDisableTranslateLabel
                            );

                            return <TableCell key={fieldName}>{resolvedFieldLabel}</TableCell>;
                        })}

                        {!disableDeleteRow && <TableCell sx={{ width: 40 }} />}
                    </TableRow>
                </TableHead>

                {collectionRows.length > 0 && (
                    <TableBody>
                        {collectionRows.map((collectionRow, key) => (
                            <TableRow key={key}>
                                {Object.keys(fields).map((field) => (
                                    <TableCell key={field}>
                                        <Box sx={{ display: "grid" }}>
                                            {React.cloneElement(
                                                fields[field],
                                                Object.assign(fieldPropsOverride, {
                                                    name: name + "." + key + "." + field,
                                                    path: path + "." + key + "." + field,
                                                })
                                            )}
                                        </Box>
                                    </TableCell>
                                ))}
                                {!disableDeleteRow && (
                                    <TableCell sx={{ width: 40 }}>
                                        <IconButton onClick={() => deleteRow(key)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                )}
                {!disableAddRow && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={Object.keys(fields).length + (disableDeleteRow ? 0 : 1)}>
                                <div onClick={() => addRow()}>
                                    <IconButton>
                                        <Add color="primary" />
                                    </IconButton>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                )}
            </Table>
        </div>
    );
};

export default Collection;
export { CollectionProps, CollectionSpecificProps };
