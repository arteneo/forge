import React from "react";
import { Box, DialogActions as MuiDialogActions } from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDialog } from "../../contexts/Dialog";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";
import Button, { ButtonProps } from "../../components/Common/Button";

interface DialogActionsSpecificProps {
    actions?: ResolveDialogPayloadType<React.ReactNode>;
    closeButtonProps?: ButtonProps;
    onClose: () => void;
}

type DialogActionsProps = DialogActionsSpecificProps & ButtonProps;

const DialogActions = ({ actions, onClose, closeButtonProps }: DialogActionsProps) => {
    const { payload, initialized } = useDialog();

    const resolvedActions = resolveDialogPayload<React.ReactNode>(actions, payload, initialized);

    const internalCloseButtonProps: ButtonProps = {
        label: "action.close",
        color: "warning",
        variant: "outlined",
        startIcon: <Close />,
        onClick: () => onClose(),
    };
    const mergedCloseButtonProps = Object.assign(internalCloseButtonProps, closeButtonProps);

    return (
        <MuiDialogActions {...{ sx: { justifyContent: "flex-start", flexWrap: "wrap-reverse", gap: 1 } }}>
            <Button {...mergedCloseButtonProps} />
            <Box
                {...{
                    sx: { display: "flex", justifyContent: "flex-end", flexWrap: "wrap", gap: 1, flexGrow: 1, ml: 2 },
                }}
            >
                {resolvedActions}
            </Box>
        </MuiDialogActions>
    );
};

export default DialogActions;
export { DialogActionsSpecificProps, DialogActionsProps };
