import React from "react";
import { useUtils } from "@mui/x-date-pickers/internals/hooks/useUtils";
import { getIn } from "formik";
import { DateIOFormats } from "@date-io/core/IUtils";
import ColumnPathInterface from "../../../components/Table/definitions/ColumnPathInterface";

interface DateFormatColumnProps extends ColumnPathInterface {
    format: keyof DateIOFormats;
}

const DateFormatColumn = ({ format, result, columnName, path }: DateFormatColumnProps) => {
    if (typeof columnName === "undefined") {
        throw new Error("DateFormatColumn component: Missing required columnName prop");
    }

    if (typeof result === "undefined") {
        throw new Error("DateFormatColumn component: Missing required result prop");
    }

    const utils = useUtils();

    const value = getIn(result, path ? path : columnName);
    if (!value) {
        return null;
    }

    const dateValue = utils.date(value);
    if (dateValue == "Invalid Date") {
        console.warn("DateFormatColumn component: Could not parse date");
        return null;
    }

    return <>{utils.format(dateValue, format)}</>;
};

export default DateFormatColumn;
export { DateFormatColumnProps };
