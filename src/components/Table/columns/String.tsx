import React from "react";

interface Props {
    // result is added to props by TableContent
    // eslint-disable-next-line
    result?: any;
    // field is added to props by TableContent
    field?: string;
    disableSorting?: boolean;
}

const String: React.FC<Props> = ({ result, field }: Props) => {
    if (typeof field === "undefined") {
        return null;
    }

    return <>{result[field]}</>;
};

export default String;
