import React from "react";
import { Dialog as MuiDialog, DialogProps as MuiDialogProps } from "@mui/material";
import { useDeepCompareEffectNoCheck } from "use-deep-compare-effect";
import axios, { AxiosError, AxiosResponse } from "axios";
import EndpointType from "../definitions/EndpointType";
import { resolveEndpoint } from "../utilities/resolve";
import { AXIOS_CANCELLED_UNMOUNTED, useHandleCatch } from "../contexts/HandleCatch";
import Optional from "../definitions/Optional";

// eslint-disable-next-line
type DialogPayload = any;

interface DialogContextProps {
    initialized: boolean;
    payload: DialogPayload;
    open: boolean;
    onClose: () => void;
}

interface DialogProviderProps {
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
    initializeEndpoint?: EndpointType;
    dialogProps?: Optional<MuiDialogProps, "open">;
}

const contextInitial = {
    initialized: false,
    payload: undefined,
    open: false,
    onClose: (): void => {
        return;
    },
};

const DialogContext = React.createContext<DialogContextProps>(contextInitial);

const DialogProvider = ({ children, open, onClose, initializeEndpoint, dialogProps }: DialogProviderProps) => {
    const handleCatch = useHandleCatch();

    const [initialized, setInitialized] = React.useState(false);
    // eslint-disable-next-line
    const [payload, setPayload] = React.useState<any>(undefined);

    const requestConfig = resolveEndpoint(initializeEndpoint);

    useDeepCompareEffectNoCheck(() => initialize(), [requestConfig, open]);

    const initialize = () => {
        if (typeof requestConfig === "undefined") {
            setInitialized(true);
            setPayload(undefined);
            return;
        }

        if (!open) {
            setInitialized(false);
            setPayload(undefined);
            return;
        }

        const axiosSource = axios.CancelToken.source();
        // requestConfig needs to be copied to avoid firing useDeepCompareEffectNoCheck
        const axiosRequestConfig = Object.assign({ cancelToken: axiosSource.token }, requestConfig);

        axios
            .request(axiosRequestConfig)
            .then((response: AxiosResponse) => {
                setPayload(response.data);
                setInitialized(true);
            })
            .catch((error: AxiosError) => {
                onClose();
                setInitialized(false);
                setPayload(undefined);
                handleCatch(error);
            });

        return () => {
            axiosSource.cancel(AXIOS_CANCELLED_UNMOUNTED);
        };
    };

    if (!open) {
        return null;
    }

    const internalDialogProps: MuiDialogProps = {
        fullWidth: true,
        maxWidth: "sm",
        open,
        onClose,
    };
    const mergedDialogProps = Object.assign(internalDialogProps, dialogProps);

    return (
        <DialogContext.Provider
            value={{
                initialized,
                payload,
                open,
                onClose,
            }}
        >
            <MuiDialog {...mergedDialogProps}>{children}</MuiDialog>
        </DialogContext.Provider>
    );
};

const useDialog = (): DialogContextProps => React.useContext(DialogContext);

export { DialogPayload, DialogContext, DialogContextProps, DialogProvider, DialogProviderProps, useDialog };
