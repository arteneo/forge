import DeniedAccessListInterface from "@arteneo/forge/components/Table/definitions/DeniedAccessListInterface";
import DeniedAccessBehaviorType from "@arteneo/forge/components/Table/definitions/DeniedAccessBehaviorType";

interface DeniedAccessInterface {
    deniedAccessList?: DeniedAccessListInterface;
    accessKey?: string;
    deniedAccessBehavior?: DeniedAccessBehaviorType;
}

export default DeniedAccessInterface;
