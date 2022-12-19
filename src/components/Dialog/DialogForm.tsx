import React from "react";
import Form, { FormProps } from "../../components/Form/components/Form";
import Optional from "../../definitions/Optional";
import { DialogProvider, DialogProviderProps } from "../../contexts/Dialog";
import DialogTitle, { DialogTitleSpecificProps } from "../../components/Dialog/DialogTitle";
import DialogContent, { DialogContentSpecificProps } from "../../components/Dialog/DialogContent";
import DialogActions from "../../components/Dialog/DialogActions";
import DialogButtonSubmit, { DialogButtonSubmitProps } from "../../components/Dialog/DialogButtonSubmit";

type DialogFormFormProps = Optional<FormProps, "children">;

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
                    onSubmitSuccess: (defaultOnSubmitSuccess, helpers, response) => {
                        const internalDefaultOnSubmitSuccess = () => {
                            defaultOnSubmitSuccess();
                            onClose();
                        };

                        if (typeof formProps.onSubmitSuccess !== "undefined") {
                            formProps.onSubmitSuccess(internalDefaultOnSubmitSuccess, helpers, response);
                            return;
                        }

                        internalDefaultOnSubmitSuccess();
                    },
                    onSubmitCatch: (defaultOnSubmitCatch, helpers, error) => {
                        const internalDefaultOnSubmitCatch = () => {
                            defaultOnSubmitCatch();

                            if (error?.response?.status !== 400) {
                                onClose();
                            }
                        };

                        if (typeof formProps.onSubmitCatch !== "undefined") {
                            formProps.onSubmitCatch(internalDefaultOnSubmitCatch, helpers, error);
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
