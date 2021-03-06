import React from "react";
import { useUtils } from "@material-ui/pickers";
import { getIn } from "formik";
import TableColumnPathType from "@arteneo/forge/components/Table/definitions/TableColumnPathType";

const DateColumn = ({ result, field, path }: TableColumnPathType) => {
    if (typeof field === "undefined") {
        throw new Error("DateColumn component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("DateColumn component: Missing required result prop");
    }

    // We force TS to think this is any object to silence issue with missing function formatDate
    // utils is class from @arteneo/forge/utils/AppDateFnsUtils. Can be extended in specific projects
    // eslint-disable-next-line
    const utils: any = useUtils();

    const value = getIn(result, path ? path : field);
    return <>{utils.formatDate(value)}</>;
};

export default DateColumn;
export { TableColumnPathType as DateColumnProps };
