import React from "react";
import { useUtils } from "@material-ui/pickers";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";

const DateTimeColumn = ({ result, field, path }: TableColumnPathType) => {
    if (typeof field === "undefined") {
        throw new Error("DateTimeColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("DateTimeColumn component: Missing required result prop");
    }

    // We force TS to think this is any object to silence issue with missing function formatDateTime
    // utils is class from @arteneo/forge/utils/AppDateFnsUtils. Can be extended in specific projects
    // eslint-disable-next-line
    const utils: any = useUtils();

    const value = getIn(result, path ? path : field);
    return <>{utils.formatDateTime(value)}</>;
};

export default DateTimeColumn;
export { TableColumnPathType as DateTimeColumnProps };
