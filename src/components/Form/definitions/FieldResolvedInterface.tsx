interface FieldResolvedInterface {
    name: string;
    path: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
    hidden: boolean;
    validate?: string;
}

export default FieldResolvedInterface;
