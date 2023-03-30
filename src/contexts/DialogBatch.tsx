import React from "react";
import { RequestExecutionExceptionType } from "../definitions/RequestExecutionException";
import ResultInterface from "../components/Table/definitions/ResultInterface";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

type BatchResultStatusType = "success" | "warning" | "skipped" | "error";

type BatchResultMessageStatusType = "warning" | "error";

interface BatchResultMessageInterface {
    message: string;
    severity: BatchResultMessageStatusType;
    parameters?: TranslateVariablesInterface;
}

interface BatchResultInterface {
    id: number;
    representation: string;
    status: BatchResultStatusType;
    messages?: BatchResultMessageInterface[];
}

interface DialogBatchContextProps {
    results: ResultInterface[];
    processing: boolean;
    setProcessing: React.Dispatch<React.SetStateAction<boolean>>;
    finished: boolean;
    setFinished: React.Dispatch<React.SetStateAction<boolean>>;
    batchResults: BatchResultInterface[];
    setBatchResults: React.Dispatch<React.SetStateAction<BatchResultInterface[]>>;
}

interface DialogBatchProviderProps {
    children: React.ReactNode;
    results: ResultInterface[];
}

const contextInitial = {
    results: [],
    processing: false,
    setProcessing: () => {
        return;
    },
    finished: false,
    setFinished: () => {
        return;
    },
    batchResults: [],
    setBatchResults: () => {
        return;
    },
};

const DialogBatchContext = React.createContext<DialogBatchContextProps>(contextInitial);

const DialogBatchProvider = ({ children, results }: DialogBatchProviderProps) => {
    const [processing, setProcessing] = React.useState(false);
    const [finished, setFinished] = React.useState(false);
    const [batchResults, setBatchResults] = React.useState<BatchResultInterface[]>([]);

    return (
        <DialogBatchContext.Provider
            value={{
                results,
                processing,
                setProcessing,
                finished,
                setFinished,
                batchResults,
                setBatchResults,
            }}
        >
            {children}
        </DialogBatchContext.Provider>
    );
};

const useDialogBatch = (): DialogBatchContextProps => React.useContext(DialogBatchContext);

const mapRequestExecutionException = (
    id: number,
    representation: string,
    requestExecutionException: RequestExecutionExceptionType
): BatchResultInterface => ({
    id,
    representation,
    status: requestExecutionException.severity,
    messages: requestExecutionException.errors,
});

export {
    BatchResultStatusType,
    BatchResultMessageStatusType,
    BatchResultInterface,
    BatchResultMessageInterface,
    DialogBatchContext,
    DialogBatchContextProps,
    DialogBatchProvider,
    DialogBatchProviderProps,
    useDialogBatch,
    mapRequestExecutionException,
};
