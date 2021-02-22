import React from "react";
import { useUtils } from "@material-ui/pickers";

interface Props {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
}

const Time: React.FC<Props> = ({ result, field }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    // We force TS to think this is any object to silence issue with missing function formatTime
    // utils is class from @arteneo/forge/utils/AppDateFnsUtils. Can be extended in specific projects
    // eslint-disable-next-line
    const utils: any = useUtils();

    return <>{utils.formatTime(result[field])}</>;
};

export default Time;
