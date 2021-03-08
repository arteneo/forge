interface FieldElementInterface {
    name: string;
    path: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
}

export default FieldElementInterface;
