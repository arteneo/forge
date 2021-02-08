import { Value } from "@material-ui/lab";
import OptionInterface from "forge-react/components/Form/definitions/OptionInterface";

export type Multiple = boolean | undefined;
export type DisableClearable = boolean | undefined;
export type FreeSolo = boolean | undefined;
export type SelectValueType = Value<OptionInterface, Multiple, DisableClearable, FreeSolo>;
