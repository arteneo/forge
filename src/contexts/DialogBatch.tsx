import React from "react";
import EndpointType from "../definitions/EndpointType";
import ResultInterface from "../components/Table/definitions/ResultInterface";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

type BatchResultStatusType = "success" | "skipped" | "error";

interface BatchResultInterface {
    id: number;
    representation: string;
    status: BatchResultStatusType;
    message?: string;
    messageVariables?: TranslateVariablesInterface;
}

interface DialogBatchContextProps {
    results: ResultInterface[];
    endpoint: (result: ResultInterface) => EndpointType;
    processing: boolean;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    batchResults: BatchResultInterface[];
    setBatchResults: React.Dispatch<React.SetStateAction<BatchResultInterface[]>>;
}

interface DialogBatchProviderProps {
    children: React.ReactNode;
    results: ResultInterface[];
    endpoint: (result: ResultInterface) => EndpointType;
}

const contextInitial = {
    results: [],
    endpoint: (): EndpointType => {
        return;
    },
    processing: false,
    setProcessing: () => {
        return;
    },
    batchResults: [],
    setBatchResults: () => {
        return;
    },
};

const DialogBatchContext = React.createContext<DialogBatchContextProps>(contextInitial);

const DialogBatchProvider = ({ children, results, endpoint }: DialogBatchProviderProps) => {
    const [processing, setProcessing] = React.useState(false);
    const [batchResults, setBatchResults] = React.useState<BatchResultInterface[]>([]);

    return (
        <DialogBatchContext.Provider
            value={{
                results,
                endpoint,
                processing,
                setProcessing,
                batchResults,
                setBatchResults,
            }}
        >
            {children}
        </DialogBatchContext.Provider>
    );
};

const useDialogBatch = (): DialogBatchContextProps => React.useContext(DialogBatchContext);

export {
    BatchResultStatusType,
    BatchResultInterface,
    DialogBatchContext,
    DialogBatchContextProps,
    DialogBatchProvider,
    DialogBatchProviderProps,
    useDialogBatch,
};
