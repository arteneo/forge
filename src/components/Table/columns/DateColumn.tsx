import React from "react";
import DateFormatColumn, { DateFormatColumnProps } from "../../../components/Table/columns/DateFormatColumn";
import { Optional } from "../../../utils/TypescriptOperators";

type DateColumnProps = Optional<DateFormatColumnProps, "format">;

const DateColumn = ({ format = "fullDate", ...props }: DateColumnProps) => {
    return <DateFormatColumn {...{ format, ...props }} />;
};

export default DateColumn;
export { DateColumnProps };
