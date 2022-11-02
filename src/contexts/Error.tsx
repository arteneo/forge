import React from "react";
import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

interface ErrorContextProps {
    error?: number;
    setError: (error: undefined | number) => void;
    message?: string;
    setMessage: (message: undefined | string) => void;
    detailedErrors?: DetailedErrorInterface[];
    setDetailedErrors: (detailedErrors: undefined | DetailedErrorInterface[]) => void;
    clearDetailedErrors: () => void;
    addDetailedError: (detailedErrors: DetailedErrorInterface) => void;
}

interface DetailedErrorInterface {
    message: string;
    parameters?: TranslateVariablesInterface;
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
    detailedErrors: undefined,
    setDetailedErrors: () => {
        return;
    },
    clearDetailedErrors: () => {
        return;
    },
    addDetailedError: () => {
        return;
    },
};

const ErrorContext = React.createContext<ErrorContextProps>(contextInitial);

const ErrorProvider = ({ children }: ErrorProviderProps) => {
    const [error, setError] = React.useState<undefined | number>(undefined);
    const [message, setMessage] = React.useState<undefined | string>(undefined);
    const [detailedErrors, setDetailedErrors] = React.useState<undefined | DetailedErrorInterface[]>([]);

    const clearDetailedErrors = () => {
        setError(undefined);
        setMessage(undefined);
        setDetailedErrors(undefined);
    };

    const addDetailedError = (detailedError: DetailedErrorInterface) => {
        setDetailedErrors((_detailedErrors) => {
            _detailedErrors?.push(detailedError);
            return _detailedErrors;
        });
    };

    return (
        <ErrorContext.Provider
            value={{
                error,
                setError,
                message,
                setMessage,
                detailedErrors,
                setDetailedErrors,
                clearDetailedErrors,
                addDetailedError,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

const useError = (): ErrorContextProps => React.useContext(ErrorContext);

export { ErrorContext, ErrorContextProps, ErrorProvider, ErrorProviderProps, useError, DetailedErrorInterface };
