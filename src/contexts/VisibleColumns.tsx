import React from "react";

interface VisibleColumnInterface {
    name: string;
    visible: boolean;
}

interface VisibleColumnsProviderProps {
    children: React.ReactNode;
}

interface VisibleColumnsContextProps {
    columns: VisibleColumnInterface[];
    setColumns: React.Dispatch<React.SetStateAction<VisibleColumnInterface[]>>;
}

const contextInitial = {
    columns: [],
    setColumns: () => {
        return;
    },
};

const VisibleColumnsContext = React.createContext<VisibleColumnsContextProps>(contextInitial);

const VisibleColumnsProvider = ({ children }: VisibleColumnsProviderProps) => {
    const [columns, setColumns] = React.useState<VisibleColumnInterface[]>([]);

    return (
        <VisibleColumnsContext.Provider
            value={{
                columns,
                setColumns,
            }}
        >
            {children}
        </VisibleColumnsContext.Provider>
    );
};

const useVisibleColumns = (): VisibleColumnsContextProps => React.useContext(VisibleColumnsContext);

export {
    VisibleColumnInterface,
    VisibleColumnsContext,
    VisibleColumnsContextProps,
    VisibleColumnsProvider,
    VisibleColumnsProviderProps,
    useVisibleColumns,
};
