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
        errors: FormikErrors<FormikValues>,
        nextElementKey: number
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
        errors: FormikErrors<FormikValues>,
        initialMaxElementKey: number
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

    // Collection values can be an object of elements (or an array of elements)
    // Object.assign is used to convert the array to an object
    const collectionRows = Object.assign({}, getIn(values, path, {}));
    const elementKeys = Object.keys(collectionRows) as unknown as number[];
    const hasElements = elementKeys.length > 0 ? true : false;

    // Initial max element key = -1 means initially there were no elements in the collection
    const [initialMaxElementKey, setInitialMaxElementKey] = React.useState(-1);
    const [lockInitialMaxElementKey, setLockInitialMaxElementKey] = React.useState(false);

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

    /**
     * Lock initial max element key and return it
     */
    const lock = (): number => {
        if (lockInitialMaxElementKey === true) {
            return initialMaxElementKey;
        }

        const lockedInitialMaxElementKey = Object.keys(collectionRows).length - 1;
        setInitialMaxElementKey(lockedInitialMaxElementKey);
        setLockInitialMaxElementKey(true);

        return lockedInitialMaxElementKey;
    };

    /**
     * Get next element key
     */
    const getNextElementKey = (initialMaxElementKey: number): number => {
        return Math.max(...elementKeys, initialMaxElementKey) + 1;
    };

    const addRow = () => {
        const initialMaxElementKey = lock();
        const nextElementKey = getNextElementKey(initialMaxElementKey);

        if (onAddRow) {
            onAddRow(
                setFieldValue,
                values,
                path,
                () => defaultAddRow(nextElementKey),
                name,
                touched,
                errors,
                initialMaxElementKey
            );
            return;
        }

        defaultAddRow(nextElementKey);
    };

    const defaultAddRow = (nextElementKey: number) => {
        collectionRows[nextElementKey] = resolveAnyOrFunction(initialValues, values, path, name, touched, errors);
        setFieldValue(path, collectionRows);
    };

    const deleteRow = (key: number) => {
        const initialMaxElementKey = lock();

        if (onDeleteRow) {
            onDeleteRow(
                key,
                setFieldValue,
                values,
                path,
                () => defaultDeleteRow(key, initialMaxElementKey),
                name,
                touched,
                errors,
                initialMaxElementKey
            );
            return;
        }

        defaultDeleteRow(key, initialMaxElementKey);
    };

    const defaultDeleteRow = (key: number, initialMaxElementKey: number) => {
        if (key <= initialMaxElementKey) {
            // When deleting element lower or equal then initialMaxElementKey there is no need to re-index anything
            delete collectionRows[key];
        } else {
            // When deleting one of new elements we need to re-index all elements with key higher than deleted element
            const newKeys = elementKeys.filter((newKey) => newKey > initialMaxElementKey);
            newKeys.forEach((newKey) => {
                if (newKey === key) {
                    delete collectionRows[key];
                }

                if (newKey > key) {
                    collectionRows[newKey - 1] = collectionRows[newKey];
                }
            });

            const lastKey = newKeys[newKeys.length - 1];
            delete collectionRows[lastKey];
        }

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

                {hasElements && (
                    <TableBody>
                        {elementKeys.map((key) => (
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
