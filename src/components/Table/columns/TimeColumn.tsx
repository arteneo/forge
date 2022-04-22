import React from "react";
import DateFormatColumn, { DateFormatColumnProps } from "../../../components/Table/columns/DateFormatColumn";
import { Optional } from "../../../utils/TypescriptOperators";

type TimeColumnProps = Optional<DateFormatColumnProps, "format">;

const TimeColumn = ({ format = "fullTime24h", ...props }: TimeColumnProps) => {
    return <DateFormatColumn {...{ format, ...props }} />;
};

export default TimeColumn;
export { TimeColumnProps };
