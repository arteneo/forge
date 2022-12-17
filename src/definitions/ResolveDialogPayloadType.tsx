import { DialogPayload } from "../contexts/Dialog";

type ResolveDialogPayloadType<T> = T | ((payload: DialogPayload, initialized: boolean) => T);

export default ResolveDialogPayloadType;
