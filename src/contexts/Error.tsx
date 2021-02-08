import React from "react";

interface ContextProps {
    error?: number;
    setError: (error: undefined | number) => void;
}

interface ProviderProps {
    children: React.ReactNode;
}

const contextInitial = {
    error: undefined,
    setError: () => {
        return;
    },
};

const ErrorContext = React.createContext<ContextProps>(contextInitial);

const ErrorProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
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

const useError = (): ContextProps => React.useContext(ErrorContext);

export { ErrorContext, ErrorProvider, useError };
