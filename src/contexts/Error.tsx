import React from "react";

interface ErrorContextProps {
    error?: number;
    setError: (error: undefined | number) => void;
}

interface ErrorProviderProps {
    children: React.ReactNode;
}

const contextInitial = {
    error: undefined,
    setError: () => {
        return;
    },
};

const ErrorContext = React.createContext<ErrorContextProps>(contextInitial);

const ErrorProvider = ({ children }: ErrorProviderProps) => {
    const [error, setError] = React.useState<undefined | number>(undefined);

    return (
        <ErrorContext.Provider
            value={{
                error,
                setError,
            }}
        >
            {children}
        </ErrorContext.Provider>
    );
};

const useError = (): ErrorContextProps => React.useContext(ErrorContext);

export { ErrorContext, ErrorContextProps, ErrorProvider, ErrorProviderProps, useError };
