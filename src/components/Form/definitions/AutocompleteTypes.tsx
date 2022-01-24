import { Value } from "@mui/lab";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";

export type Multiple = boolean | undefined;
export type DisableClearable = boolean | undefined;
export type FreeSolo = boolean | undefined;
export type SelectValueType = Value<OptionInterface, Multiple, DisableClearable, FreeSolo>;
