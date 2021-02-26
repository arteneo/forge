import React from "react";
import { useForm } from "@arteneo/forge/components/Form/contexts/Form";
import { resolveAnyOrFunction, resolveBooleanOrFunction } from "@arteneo/forge/utils/resolve";
import { FormikValues, FormikTouched, FormikErrors, FormikProps, useFormikContext, getIn } from "formik";
import FieldInterface from "@arteneo/forge/components/Form/definitions/FieldInterface";
import FieldsInterface from "@arteneo/forge/components/Form/definitions/FieldsInterface";
import {
    Box,
    FormHelperText,
    IconButton,
    makeStyles,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import { Add, Delete } from "@material-ui/icons";

interface Props extends FieldInterface {
    fields: FieldsInterface;
    disableAddRow?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    disableDeleteRow?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    onAddRow?: (
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        values: FormikValues,
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        defaultAddRow: () => void
    ) => void;
    onDeleteRow?: (
        key: number,
        // eslint-disable-next-line
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void,
        values: FormikValues,
        name: string,
        touched: FormikTouched<FormikValues>,
        errors: FormikErrors<FormikValues>,
        defaultDeleteRow: () => void
    ) => void;
    initialValues?:
        | ((
              values: FormikValues,
              name: string,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>
          ) => FormikValues)
        | FormikValues;
}

const useStyles = makeStyles((theme) => ({
    tableCellDeleteRow: {
        width: 48,
    },
    buttonAddRow: {
        cursor: "pointer",
    },
    iconAddRow: {
        padding: theme.spacing(1),
    },
}));

const Collection: React.FC<Props> = ({
    fields,
    name,
    label,
    disableAutoLabel = false,
    disableTranslateLabel = false,
    help,
    disableTranslateHelp = false,
    hidden = false,
    disabled = false,
    disableAddRow = false,
    disableDeleteRow = false,
    onAddRow,
    onDeleteRow,
    initialValues = {},
}: Props) => {
    if (typeof name === "undefined") {
        throw new Error("Collection component: name is required prop. By default it is injected by FormContent.");
    }

    const classes = useStyles();
    const { isReady, getError, getLabel, getHelp } = useForm();
    const { values, touched, errors, setFieldValue }: FormikProps<FormikValues> = useFormikContext();

    const resolvedHidden = resolveBooleanOrFunction(hidden, values, touched, errors, name);

    if (resolvedHidden || !isReady(name)) {
        return null;
    }

    const collectionRows: FormikValues[] = getIn(values, name, []);

    const addRow = () => {
        if (onAddRow) {
            onAddRow(setFieldValue, values, name, touched, errors, () => defaultAddRow());
            return;
        }

        defaultAddRow();
    };

    const defaultAddRow = () => {
        collectionRows.push(resolveAnyOrFunction(initialValues, values, name, touched, errors));
        setFieldValue(name, collectionRows);
    };

    const deleteRow = (key: number) => {
        if (onDeleteRow) {
            onDeleteRow(key, setFieldValue, values, name, touched, errors, () => defaultDeleteRow(key));
            return;
        }
        defaultDeleteRow(key);
    };

    const defaultDeleteRow = (key: number) => {
        collectionRows.splice(key, 1);
        setFieldValue(name, collectionRows);
    };

    const resolvedHelp = getHelp(values, touched, errors, name, help, disableTranslateHelp);
    const resolvedDisabled = resolveBooleanOrFunction(disabled, values, touched, errors, name);
    const resolvedLabel = getLabel(label, values, touched, errors, name, disableAutoLabel, disableTranslateLabel);
    const resolvedError = getError(name, touched, errors);

    const fieldPropsOverride: FormikValues = {
        label: undefined,
        disableAutoLabel: true,
    };
    if (resolvedDisabled) {
        fieldPropsOverride.disabled = true;
    }

    const resolvedDisableAddRow = resolveBooleanOrFunction(disableAddRow, values, touched, errors, name);
    const resolvedDisableDeleteRow = resolveBooleanOrFunction(disableDeleteRow, values, touched, errors, name);

    return (
        <div className="ForgeCollectionTable-root">
            {(resolvedLabel || resolvedHelp || resolvedError) && (
                <Box mt={3} mb={2}>
                    {resolvedLabel && (
                        <Typography component="h2" variant="h3">
                            {resolvedLabel}
                        </Typography>
                    )}
                    {resolvedHelp && <FormHelperText>{resolvedHelp}</FormHelperText>}
                    {resolvedError && <FormHelperText error>{resolvedError}</FormHelperText>}
                </Box>
            )}

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

                        {!resolvedDisableDeleteRow && <TableCell />}
                    </TableRow>
                </TableHead>

                {collectionRows.length > 0 && (
                    <TableBody>
                        {collectionRows.map((collectionRow, key) => (
                            <TableRow key={key}>
                                {Object.keys(fields).map((field) => (
                                    <TableCell key={field}>
                                        {React.cloneElement(
                                            fields[field],
                                            Object.assign(fieldPropsOverride, {
                                                name: name + "." + key + "." + field,
                                            })
                                        )}
                                    </TableCell>
                                ))}
                                {!resolvedDisableDeleteRow && (
                                    <TableCell className={classes.tableCellDeleteRow}>
                                        <IconButton onClick={() => deleteRow(key)}>
                                            <Delete color="error" />
                                        </IconButton>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                )}
                {!resolvedDisableAddRow && (
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={Object.keys(fields).length + (resolvedDisableDeleteRow ? 0 : 1)}>
                                <div className={classes.buttonAddRow} onClick={() => addRow()}>
                                    <IconButton className={classes.iconAddRow}>
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
