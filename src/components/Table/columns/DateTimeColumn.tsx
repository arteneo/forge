import React from "react";
import { useUtils } from "@material-ui/pickers";
import { getIn } from "formik";
import ColumnPathInterface from "@arteneo/forge/components/Table/definitions/ColumnPathInterface";

const DateTimeColumn = ({ result, field, path }: ColumnPathInterface) => {
    if (typeof field === "undefined") {
        return null;
    }

    // We force TS to think this is any object to silence issue with missing function formatDateTime
    // utils is class from @arteneo/forge/utils/AppDateFnsUtils. Can be extended in specific projects
    // eslint-disable-next-line
    const utils: any = useUtils();

    const value = getIn(result, path ? path : field);
    return <>{utils.formatDateTime(value)}</>;
};

export default DateTimeColumn;
export { ColumnPathInterface as DateTimeColumnProps };
