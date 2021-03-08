interface FieldElementInterface {
    name: string;
    label?: React.ReactNode;
    error?: string;
    help?: React.ReactNode;
    required: boolean;
    disabled: boolean;
}

export default FieldElementInterface;
