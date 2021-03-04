import DeniedAccessListInterface from "@arteneo/forge/components/Table/definitions/DeniedAccessListInterface";

interface ResultInterface {
    id: number;
    representation: string;
    deniedAccessList?: DeniedAccessListInterface;
    // eslint-disable-next-line
    [key: string]: any;
}

export default ResultInterface;
