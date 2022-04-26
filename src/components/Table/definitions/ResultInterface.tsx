import DenyInterface from "../../../components/Table/definitions/DenyInterface";

interface ResultInterface {
    id: number;
    representation: string;
    deny?: DenyInterface;
    // eslint-disable-next-line
    [key: string]: any;
}

export default ResultInterface;
