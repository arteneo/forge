import { AutocompleteValue } from "@mui/material";
import OptionInterface from "@arteneo/forge/components/Form/definitions/OptionInterface";

export type Multiple = boolean | undefined;
export type DisableClearable = boolean | undefined;
export type FreeSolo = boolean | undefined;
export type SelectValueType = AutocompleteValue<OptionInterface, Multiple, DisableClearable, FreeSolo>;
