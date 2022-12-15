// TODO Do not use this. Will be changed
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

interface ResultButtonEndpointDialogConfirmRenderDialogParams extends ButtonDialogConfirmProps {
    result: ResultInterface;
}

interface ResultButtonEndpointDialogConfirmSpecificProps {
    endpoint: ResultResolveType<EndpointType>;
    disableOnSuccessReload?: boolean;
    onSuccess?: (
        defaultOnSuccess: () => void,
        response: AxiosResponse,
        // eslint-disable-next-line
        value: any,
        result: ResultInterface,
        path?: string
    ) => void;
    renderDialog?: (params: ResultButtonEndpointDialogConfirmRenderDialogParams) => React.ReactNode;
}

type ResultButtonEndpointDialogConfirmProps = ColumnActionPathInterface &
    ResultButtonEndpointDialogConfirmSpecificProps;

const ResultButtonEndpointDialogConfirm = ({
    endpoint,
    disableOnSuccessReload,
    onSuccess,
    result,
    path,
    renderDialog = () => <>TODO</>,
    ...props
}: ResultButtonEndpointDialogConfirmProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonEndpointDialogConfirm component: Missing required result prop");
    }

    // TODO
    return null;

    // const { reload } = useTable();
    // const value = path ? getIn(result, path) : result;
    // const resolvedEndpoint: EndpointType = resolveAnyOrFunction(endpoint, value, result, path);

    // const internalOnSuccess = (defaultOnSuccess: () => void) => {
    //     defaultOnSuccess();

    //     if (!disableOnSuccessReload) {
    //         reload();
    //     }
    // };

    // // Lines below are written like that due to formatting issue
    // let resolvedOnSuccess;
    // if (onSuccess) {
    //     resolvedOnSuccess = (defaultOnSuccess: () => void, response: AxiosResponse) =>
    //         onSuccess(() => internalOnSuccess(defaultOnSuccess), response, value, result, path);
    // } else {
    //     resolvedOnSuccess = internalOnSuccess;
    // }

    // return (
    //     <ButtonEndpointDialogConfirm
    //         {...{
    //             endpoint: resolvedEndpoint,
    //             onSuccess: resolvedOnSuccess,
    //             deny: result?.deny,
    //             renderDialog: (params: any) => renderDialog({ ...params, result }),
    //             ...props,
    //         }}
    //     />
    // );
};

export default ResultButtonEndpointDialogConfirm;
export {
    ResultButtonEndpointDialogConfirmProps,
    ResultButtonEndpointDialogConfirmSpecificProps,
    ResultButtonEndpointDialogConfirmRenderDialogParams,
};
