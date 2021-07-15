import TranslateVariablesInterface from "@arteneo/forge/definitions/TranslateVariablesInterface";
import { Optional } from "@arteneo/forge/utils/TypescriptOperators";
import { TooltipProps } from "@material-ui/core";

type TableColumnTooltipProps = Optional<Optional<TooltipProps, "children">, "title">;

interface TableColumnTooltipInterface {
    tooltip?: boolean | string;
    tooltipVariables?: TranslateVariablesInterface;
    tooltipProps?: TableColumnTooltipProps;
    disableTranslateTooltip?: boolean;
}

export default TableColumnTooltipInterface;
