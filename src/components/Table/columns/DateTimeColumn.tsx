import React from "react";
import DateFormatColumn, { DateFormatColumnProps } from "../../../components/Table/columns/DateFormatColumn";
import { Optional } from "../../../utils/TypescriptOperators";

type DateTimeColumnProps = Optional<DateFormatColumnProps, "format">;

const DateTimeColumn = ({ format = "fullDateTime24h", ...props }: DateTimeColumnProps) => {
    return <DateFormatColumn {...{ format, ...props }} />;
};

export default DateTimeColumn;
export { DateTimeColumnProps };
