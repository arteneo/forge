import React from "react";
import { AxiosResponse } from "axios";
import { getIn } from "formik";
import ButtonDialogConfirm, { ButtonDialogConfirmProps } from "../../../components/Common/ButtonDialogConfirm";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import EndpointType from "../../../definitions/EndpointType";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogConfirmSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
    disableOnSuccessReload?: boolean;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        // eslint-disable-next-line
        value: any,
        result: ResultInterface,
        setLoading: React.Dispatch<React.SetStateAction<boolean>>,
        path?: string
    ) => void;
    dialogProps: (result: ResultInterface) => ButtonDialogConfirmProps["dialogProps"];
}

type ResultButtonDialogConfirmProps = Omit<ButtonDialogConfirmProps, "endpoint" | "onSuccess" | "dialogProps"> &
    ColumnActionPathInterface &
    ResultButtonDialogConfirmSpecificProps;

const ResultButtonDialogConfirm = ({
    endpoint,
    disableOnSuccessReload,
    onSuccess,
    dialogProps,
    result,
    path,
    ...props
}: ResultButtonDialogConfirmProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogConfirm component: Missing required result prop");
    }

    const { reload } = useTable();
    const value = path ? getIn(result, path) : result;
    const resolvedEndpoint: EndpointType = resolveAnyOrFunction(endpoint, value, result, path);

    const internalOnSuccess = (defaultOnSuccess: () => void) => {
        defaultOnSuccess();

        if (!disableOnSuccessReload) {
            reload();
        }
    };

    // Lines below are written like that due to formatting issue
    let resolvedOnSuccess;
    if (onSuccess) {
        resolvedOnSuccess = (
            defaultOnSuccess: () => void,
            response: AxiosResponse,
            setLoading: React.Dispatch<React.SetStateAction<boolean>>
        ) => onSuccess(() => internalOnSuccess(defaultOnSuccess), response, value, result, setLoading, path);
    } else {
        resolvedOnSuccess = internalOnSuccess;
    }

    return (
        <ButtonDialogConfirm
            {...{
                endpoint: resolvedEndpoint,
                onSuccess: resolvedOnSuccess,
                deny: result?.deny,
                dialogProps: dialogProps(value),
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogConfirm;
export { ResultButtonDialogConfirmProps, ResultButtonDialogConfirmSpecificProps };
