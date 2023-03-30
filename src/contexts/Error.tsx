import React from "react";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

interface ErrorContextProps {
    error?: number;
    setError: (error: undefined | number) => void;
    message?: string;
    setMessage: (message: undefined | string) => void;
    errors: ErrorInterface[];
    setErrors: (errors: ErrorInterface[]) => void;
    clearErrors: () => void;
    addError: (error: ErrorInterface) => void;
}

type ErrorSeverityType = "warning" | "error";

interface ErrorInterface {
    message: string;
    parameters?: TranslateVariablesInterface;
    severity: ErrorSeverityType;
}

interface ErrorProviderProps {
    children: React.ReactNode;
}

const contextInitial = {
    error: undefined,
    setError: () => {
        return;
    },
    message: undefined,
    setMessage: () => {
        return;
    },
    errors: [],
    setErrors: () => {
        return;
    },
    clearErrors: () => {
        return;
    },
    addError: () => {
        return;
    },
};

const ErrorContext = React.createContext<ErrorContextProps>(contextInitial);

const ErrorProvider = ({ children }: ErrorProviderProps) => {
    const [error, setError] = React.useState<undefined | number>(undefined);
    const [message, setMessage] = React.useState<undefined | string>(undefined);
    const [errors, setErrors] = React.useState<ErrorInterface[]>([]);

    const clearErrors = () => {
        setError(undefined);
        setMessage(undefined);
        setErrors([]);
    };

    const addError = (error: ErrorInterface) => {
        setErrors((errors) => [...errors, error]);
    };

    return (
        <ErrorContext.Provider
            value={{
                error,
                setError,
                message,
                setMessage,
                errors,
                setErrors,
                clearErrors,
                addError,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

const useError = (): ErrorContextProps => React.useContext(ErrorContext);

export {
    ErrorContext,
    ErrorContextProps,
    ErrorProvider,
    ErrorProviderProps,
    useError,
    ErrorSeverityType,
    ErrorInterface,
};
