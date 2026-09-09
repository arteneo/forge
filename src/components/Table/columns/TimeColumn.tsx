import { DateFormatColumn, type DateFormatColumnProps } from "../../../components/Table/columns/DateFormatColumn";
import { Optional } from "../../../definitions/Optional";

type TimeColumnProps = Optional<DateFormatColumnProps, "format">;

const TimeColumn = ({ format = "fullTime24h", ...props }: TimeColumnProps) => {
    return <DateFormatColumn {...{ format, ...props }} />;
};

export { TimeColumn, type TimeColumnProps };
