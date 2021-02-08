import React from "react";

interface ContextProps {
    visibleLoader: boolean;
    showLoader: () => void;
    hideLoader: () => void;
    visibleGlobalLoader: boolean;
    showGlobalLoader: () => void;
    hideGlobalLoader: () => void;
    visibleLocalLoader: boolean;
    showLocalLoader: () => void;
    hideLocalLoader: () => void;
}

interface ProviderProps {
    children: React.ReactNode;
    hasLocalLoader?: boolean;
}

const contextInitial = {
    visibleLoader: false,
    showLoader: (): void => {
        return;
    },
    hideLoader: (): void => {
        return;
    },
    visibleGlobalLoader: false,
    showGlobalLoader: (): void => {
        return;
    },
    hideGlobalLoader: (): void => {
        return;
    },
    visibleLocalLoader: false,
    showLocalLoader: (): void => {
        return;
    },
    hideLocalLoader: (): void => {
        return;
    },
};

const LoaderContext = React.createContext<ContextProps>(contextInitial);

const LoaderProvider: React.FC<ProviderProps> = ({ children, hasLocalLoader }: ProviderProps) => {
    const [visibleGlobalLoader, setVisibleGlobalLoader] = React.useState(false);
    const [visibleLocalLoader, setVisibleLocalLoader] = React.useState(false);

    const showLoader = (): void => {
        if (hasLocalLoader) {
            showLocalLoader();
            return;
        }

        showGlobalLoader();
    };

    const hideLoader = (): void => {
        hideLocalLoader();
        hideGlobalLoader();
    };

    const showGlobalLoader = (): void => {
        setVisibleGlobalLoader(true);
    };

    const hideGlobalLoader = (): void => {
        setVisibleGlobalLoader(false);
    };

    const showLocalLoader = (): void => {
        setVisibleLocalLoader(true);
    };

    const hideLocalLoader = (): void => {
        setVisibleLocalLoader(false);
    };

    return (
        <LoaderContext.Provider
            value={{
                visibleLoader: visibleGlobalLoader || visibleLocalLoader,
                showLoader,
                hideLoader,
                visibleGlobalLoader,
                showGlobalLoader,
                hideGlobalLoader,
                visibleLocalLoader,
                showLocalLoader,
                hideLocalLoader,
            }}
        >
            {children}
        </LoaderContext.Provider>
    );
};

LoaderProvider.defaultProps = {
    hasLocalLoader: false,
};

const useLoader = (): ContextProps => React.useContext(LoaderContext);

export { LoaderContext, LoaderProvider, useLoader };
