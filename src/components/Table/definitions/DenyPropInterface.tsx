import { DenyBehaviorType } from "../../../components/Table/definitions/DenyBehaviorType";
import { DenyInterface } from "../../../components/Table/definitions/DenyInterface";

interface DenyPropInterface {
    deny?: DenyInterface;
    denyKey?: string;
    denyBehavior?: DenyBehaviorType;
}

export { type DenyPropInterface };
