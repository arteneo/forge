interface FieldResolvedInterface {
    name: string;
    path: string;
    label?: React.ReactNode;
    error?: string;
    hasError: boolean;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
    hidden: boolean;
    validate?: string;
}

export default FieldResolvedInterface;
