import React from "react";
import { FormikHelpers, FormikValues } from "formik";
import { AxiosError, AxiosResponse } from "axios";
import Form, { FormProps } from "../../components/Form/components/Form";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogContent, { DialogContentSpecificProps } from "../../components/Dialog/DialogContent";
import DialogActions from "../../components/Dialog/DialogActions";
import DialogButtonSubmit, { DialogButtonSubmitProps } from "../../components/Dialog/DialogButtonSubmit";

interface DialogFormFormProps
    extends Omit<Optional<FormProps, "children">, "onSubmitStart" | "onSubmitSuccess" | "onSubmitCatch"> {
    onSubmitStart?: (
        defaultOnStart: () => void,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        onClose: () => void
    ) => void;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse,
        onClose: () => void
    ) => void;
    onSubmitCatch?: (
        defaultOnSubmitCatch: () => void,
        values: FormikValues,
        helpers: FormikHelpers<FormikValues>,
        error: AxiosError,
        onClose: () => void
    ) => void;
}

type InternalDialogFormProps = DialogTitleSpecificProps &
    DialogContentSpecificProps &
    Optional<DialogProviderProps, "children">;

interface DialogFormProps extends InternalDialogFormProps {
    formProps: DialogFormFormProps;
    submitProps?: DialogButtonSubmitProps;
}

const DialogForm = ({
    children,
    title,
    titleVariables,
    onClose,
    formProps,
    submitProps,
    ...props
}: DialogFormProps) => {
    return (
        <DialogProvider {...{ onClose, ...props }}>
            <Form
                {...{
                    ...formProps,
                    onSubmitStart: (defaultOnSubmitStart, values, helpers) => {
                        if (typeof formProps.onSubmitStart !== "undefined") {
                            formProps.onSubmitStart(defaultOnSubmitStart, values, helpers, onClose);
                        }
                    },
                    onSubmitSuccess: (defaultOnSubmitSuccess, values, helpers, response) => {
                        const internalDefaultOnSubmitSuccess = () => {
                            defaultOnSubmitSuccess();
                            onClose();
                        };

                        if (typeof formProps.onSubmitSuccess !== "undefined") {
                            formProps.onSubmitSuccess(
                                internalDefaultOnSubmitSuccess,
                                values,
                                helpers,
                                response,
                                onClose
                            );
                            return;
                        }

                        internalDefaultOnSubmitSuccess();
                    },
                    onSubmitCatch: (defaultOnSubmitCatch, values, helpers, error) => {
                        const internalDefaultOnSubmitCatch = () => {
                            defaultOnSubmitCatch();

                            if (error?.response?.status !== 400) {
                                onClose();
                            }
                        };

                        if (typeof formProps.onSubmitCatch !== "undefined") {
                            formProps.onSubmitCatch(internalDefaultOnSubmitCatch, values, helpers, error, onClose);
                            return;
                        }

                        internalDefaultOnSubmitCatch();
                    },
                }}
            >
                <DialogTitle {...{ title, titleVariables }} />
                <DialogContent {...{ children }} />
                <DialogActions
                    {...{
                        actions: <DialogButtonSubmit {...submitProps} />,
                    }}
                />
            </Form>
        </DialogProvider>
    );
};

export default DialogForm;
export { DialogFormProps };
