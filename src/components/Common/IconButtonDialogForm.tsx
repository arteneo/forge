import React from "react";
import { AxiosResponse } from "axios";
import { useTranslation } from "react-i18next";
import { Box, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, makeStyles } from "@material-ui/core";
import { useSnackbar } from "@arteneo/forge/contexts/Snackbar";
import { useLoader } from "@arteneo/forge/contexts/Loader";
import Button, { ButtonProps } from "@arteneo/forge/components/Common/Button";
import IconButton, { IconButtonProps } from "@arteneo/forge/components/Common/IconButton";
import Form, { FormProps } from "@arteneo/forge/components/Form/components/Form";
import FormContentFields from "@arteneo/forge/components/Form/components/FormContentFields";
import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { FormikContext, FormikHelpers, FormikValues } from "formik";

interface IconButtonDialogFormProps {
    iconButtonProps: IconButtonProps;
    dialogButtonBackProps?: ButtonProps;
    dialogButtonProps?: ButtonProps;
    dialogTitle?: string;
    dialogTitleVariables?: TranslateVariablesInterface;
    dialogDialogProps?: Optional<DialogProps, "open">;
    snackbarLabel?: string;
    snackbarLabelVariables?: TranslateVariablesInterface;
    formProps: FormProps;
    children?: React.ReactNode;
}

const useStyles = makeStyles(() => ({
    dialogContent: {
        "&:first-child": {
            paddingTop: 0,
        },
    },
}));

const IconButtonDialogForm = ({
    iconButtonProps,
    dialogButtonBackProps = {
        label: "action.back",
        variant: "contained",
    },
    dialogButtonProps = {
        label: "action.save",
        variant: "contained",
        color: "primary",
    },
    dialogTitle = "crud.iconButtonDialogForm.title",
    dialogTitleVariables = {},
    dialogDialogProps = {
        fullWidth: true,
        maxWidth: "md",
    },
    snackbarLabel = "snackbar.iconButtonDialogFormSuccess",
    snackbarLabelVariables = {},
    formProps,
    children,
}: IconButtonDialogFormProps) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const { showSuccess } = useSnackbar();
    const { hideLoader } = useLoader();
    const [showDialog, setShowDialog] = React.useState(false);

    const onSubmitSuccess = (
        defaultOnSubmitSuccess: () => void,
        // eslint-disable-next-line
        submitAction: any,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse,
        // eslint-disable-next-line
        setObject: (object: any) => void
    ) => {
        const currentDefaultOnSubmitSuccess = () => {
            helpers.setSubmitting(false);
            showSuccess(snackbarLabel, snackbarLabelVariables);
            setShowDialog(false);
            hideLoader();
            setObject(response.data);
        };

        if (typeof formProps?.onSubmitSuccess !== "undefined") {
            formProps?.onSubmitSuccess(currentDefaultOnSubmitSuccess, submitAction, helpers, response, setObject);
            return;
        }

        currentDefaultOnSubmitSuccess();
    };

    if (!children && !formProps.fields) {
        throw new Error("IconButtonDialogForm component: children or formProps.fields prop is required.");
    }

    return (
        <>
            <IconButton
                {...{
                    onClick: () => setShowDialog(true),
                    ...iconButtonProps,
                }}
            />

            <Dialog open={showDialog} onClose={() => setShowDialog(false)} {...dialogDialogProps}>
                <DialogTitle>{t(dialogTitle, dialogTitleVariables)}</DialogTitle>
                <Form
                    {...{
                        buttons: null,
                        ...formProps,
                        onSubmitSuccess,
                    }}
                >
                    <DialogContent className={classes.dialogContent}>
                        {children && children}
                        {!children && formProps.fields && <FormContentFields {...{ fields: formProps.fields }} />}
                    </DialogContent>
                    <DialogActions>
                        <Box display="flex" justifyContent="space-between" flexGrow={1} px={2} pb={2}>
                            <Button onClick={() => setShowDialog(false)} {...dialogButtonBackProps} />

                            <FormikContext.Consumer>
                                {({ isSubmitting }) => (
                                    <Button
                                        {...{
                                            type: "submit",
                                            disabled: isSubmitting,
                                            ...dialogButtonProps,
                                        }}
                                    />
                                )}
                            </FormikContext.Consumer>
                        </Box>
                    </DialogActions>
                </Form>
            </Dialog>
        </>
    );
};

export default IconButtonDialogForm;
export { IconButtonDialogFormProps };
