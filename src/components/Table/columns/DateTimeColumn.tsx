import { DateFormatColumn, type DateFormatColumnProps } from "../../../components/Table/columns/DateFormatColumn";
import { Optional } from "../../../definitions/Optional";

type DateTimeColumnProps = Optional<DateFormatColumnProps, "format">;

const DateTimeColumn = ({ format = "fullDateTime24h", ...props }: DateTimeColumnProps) => {
    return <DateFormatColumn {...{ format, ...props }} />;
};

export { DateTimeColumn, type DateTimeColumnProps };
