import React from "react";
import Button, { ButtonProps } from "../../../components/Common/Button";
import TableResultActionPathInterface from "../../../components/Table/definitions/TableResultActionPathInterface";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { getIn } from "formik";

interface OnClickProps {
    // eslint-disable-next-line
    onClick: (value: any, result: ResultInterface, field: string) => void;
}

type ResultButtonOnClickProps = ButtonProps & TableResultActionPathInterface & OnClickProps;

const ResultButtonOnClick = ({ onClick, result, field, path, ...props }: ResultButtonOnClickProps) => {
    if (typeof field === "undefined") {
        throw new Error("ResultButtonOnClick component: Missing required field prop");
    }

    if (typeof result === "undefined") {
        throw new Error("ResultButtonOnClick component: Missing required result prop");
    }

    const value = path ? getIn(result, path) : result;

    return (
        <Button
            {...{
                onClick: () => onClick(value, result, field),
                deniedAccessList: result?.deniedAccessList,
                ...props,
            }}
        />
    );
};

export default ResultButtonOnClick;
export { ResultButtonOnClickProps };
