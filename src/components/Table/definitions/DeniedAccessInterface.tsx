import DeniedAccessListInterface from "../../../components/Table/definitions/DeniedAccessListInterface";
import DeniedAccessBehaviorType from "../../../components/Table/definitions/DeniedAccessBehaviorType";

interface DeniedAccessInterface {
    deniedAccessList?: DeniedAccessListInterface;
    accessKey?: string;
    deniedAccessBehavior?: DeniedAccessBehaviorType;
}

export default DeniedAccessInterface;
