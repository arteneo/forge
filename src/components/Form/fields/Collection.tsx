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
            return "validation.required";
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

        registerField(path, {
            validate: () => validate,
        });

        return () => {
            unregisterField(path);
        };
    }, [hidden, registerField, unregisterField, path, validate]);

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
        // TODO Verify uniqueness. Name of key is not relevant
        const key = "new_" + Math.random().toString(16).substring(2, 8);
        collectionRows[key] = resolveAnyOrFunction(initialValues, values, path, name, touched, errors);

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
                            const fieldLabelVariables = field?.props?.labelVariables;
                            const fieldDisableAutoLabel = field?.props?.disableAutoLabel;
                            const fieldDisableTranslateLabel = field?.props?.disableTranslateLabel;

                            const resolvedFieldLabel = getLabel(
                                fieldLabel,
                                values,
                                touched,
                                errors,
                                fieldName,
                                fieldLabelVariables,
                                fieldDisableAutoLabel,
                                fieldDisableTranslateLabel
                            );

                            return <TableCell key={fieldName}>{resolvedFieldLabel}</TableCell>;
                        })}

                        {!disableDeleteRow && <TableCell sx={{ width: 40 }} />}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {Object.keys(collectionRows).map((id) => {
                        const collectionRow = collectionRows[id];

                        return (
                            <React.Fragment key={id}>
                                {collectionRow && (
                                    <TableRow>
                                        {Object.keys(fields).map((field) => (
                                            <TableCell key={field}>
                                                <Box sx={{ display: "grid" }}>
                                                    {React.cloneElement(
                                                        fields[field],
                                                        Object.assign(fieldPropsOverride, {
                                                            name: name + "." + id + "." + field,
                                                            path: path + "." + id + "." + field,
                                                        })
                                                    )}
                                                </Box>
                                            </TableCell>
                                        ))}
                                        {!disableDeleteRow && (
                                            <TableCell sx={{ width: 40 }}>
                                                <IconButton onClick={() => deleteRow(id)}>
                                                    <Delete color="error" />
                                                </IconButton>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </TableBody>
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
