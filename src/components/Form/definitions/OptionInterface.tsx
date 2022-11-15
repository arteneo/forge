interface OptionInterface {
    id: number | string;
    representation: string;
    disabled?: boolean;
    // eslint-disable-next-line
    [key: string]: any;
}

export default OptionInterface;
