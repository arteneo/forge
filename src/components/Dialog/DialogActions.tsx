import React from "react";
import { Box, DialogActions as MuiDialogActions } from "@mui/material";
import { useDialog } from "../../contexts/Dialog";
import ResolveDialogPayloadType from "../../definitions/ResolveDialogPayloadType";
import { resolveDialogPayload } from "../../utilities/resolve";
import DialogButtonClose, { DialogButtonCloseProps } from "../../components/Dialog/DialogButtonClose";

interface DialogActionsSpecificProps {
    actions?: ResolveDialogPayloadType<React.ReactNode>;
    closeProps?: DialogButtonCloseProps;
}

type DialogActionsProps = DialogActionsSpecificProps;

const DialogActions = ({ actions, closeProps }: DialogActionsProps) => {
    const { payload, initialized } = useDialog();

    const resolvedActions = resolveDialogPayload<React.ReactNode>(actions, payload, initialized);

    return (
        <MuiDialogActions {...{ sx: { justifyContent: "flex-start", flexWrap: "wrap-reverse", gap: 1 } }}>
            <DialogButtonClose {...closeProps} />
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
