// TODO Do not use. Needs to be rewritten including ButtonDialogForm and IconButtonDialogForm, ResultButtonDialogForm
import React from "react";
import { AxiosResponse } from "axios";
import { FormikHelpers, FormikValues } from "formik";
import { Dialog, DialogProps } from "@mui/material";
import Optional from "../../definitions/Optional";
import Form, { FormProps } from "../../components/Form/components/Form";
import DialogFieldset, { DialogFieldsetProps } from "../../components/Form/fieldsets/DialogFieldset";

interface DialogFormFormProps extends Omit<Optional<FormProps, "children">, "onSubmit" | "onSubmitSuccess"> {
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse,
        onClose: () => void
    ) => void;
    onSubmit?: (values: FormikValues, helpers: FormikHelpers<FormikValues>, onClose: () => void) => void;
}

interface DialogFormProps {
    open: boolean;
    onClose: () => void;
    formProps: DialogFormFormProps;
    dialogFieldsetProps?: Omit<DialogFieldsetProps, "fields" | "onClose">;
    dialogProps?: Optional<DialogProps, "open">;
}

const DialogForm = ({
    open,
    onClose,
    formProps,
    dialogFieldsetProps = {
        title: "dialogForm.dialog.title",
    },
    dialogProps = {
        fullWidth: true,
        maxWidth: "md",
    },
}: DialogFormProps) => {
    const { onSubmit, onSubmitSuccess, ...otherFormProps } = formProps;

    const _onSubmitSuccess = (
        defaultOnSubmitSuccess: () => void,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse
    ) => {
        const currentDefaultOnSubmitSuccess = () => {
            defaultOnSubmitSuccess();
            onClose();
        };

        if (typeof onSubmitSuccess !== "undefined") {
            onSubmitSuccess(currentDefaultOnSubmitSuccess, helpers, response, onClose);
            return;
        }

        currentDefaultOnSubmitSuccess();
    };

    const _onSubmit = onSubmit
        ? (values: FormikValues, helpers: FormikHelpers<FormikValues>) => onSubmit(values, helpers, onClose)
        : undefined;

    return (
        <Dialog
            {...{
                open,
                onClose,
                ...dialogProps,
            }}
        >
            <Form
                {...{
                    children: <DialogFieldset {...{ onClose, fields: formProps.fields, ...dialogFieldsetProps }} />,
                    onSubmit: _onSubmit,
                    onSubmitSuccess: _onSubmitSuccess,
                    ...otherFormProps,
                }}
            />
        </Dialog>
    );
};

export default DialogForm;
export { DialogFormProps, DialogFormFormProps };
