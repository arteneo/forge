import React from "react";
import { AxiosResponse } from "axios";
import { FormikHelpers, FormikValues } from "formik";
import ButtonDialogForm, {
    ButtonDialogFormProps,
    ButtonDialogFormRenderDialogParams,
} from "../../../components/Common/ButtonDialogForm";
import ColumnActionPathInterface from "../../../components/Table/definitions/ColumnActionPathInterface";
import FieldsInterface from "../../../components/Form/definitions/FieldsInterface";
import ResultResolveType from "../../../components/Table/definitions/ResultResolveType";
import { resolveAnyOrFunction } from "../../../utilities/resolve";
import EndpointType from "../../../definitions/EndpointType";
import ResultInterface from "../../../components/Table/definitions/ResultInterface";
import { useTable } from "../../../components/Table/contexts/Table";

interface ResultButtonDialogFormSpecificProps {
    fields: FieldsInterface;
    endpoint: ResultResolveType<EndpointType>;
    initializeEndpoint?: ResultResolveType<EndpointType>;
    disableOnSuccessReload?: boolean;
    onSubmitSuccess?: (
        defaultOnSubmitSuccess: () => void,
        result: ResultInterface,
        helpers: FormikHelpers<FormikValues>,
        response: AxiosResponse
    ) => void;
    onSubmit?: (
        values: FormikValues,
        result: ResultInterface,
        helpers: FormikHelpers<FormikValues>,
        onClose: () => void
    ) => void;
    renderDialog?: (params: ButtonDialogFormRenderDialogParams, result: ResultInterface) => React.ReactNode;
}

type ResultButtonDialogFormProps = Omit<ButtonDialogFormProps, "formProps"> &
    ResultButtonDialogFormSpecificProps &
    ColumnActionPathInterface;

const ResultButtonDialogForm = ({
    endpoint,
    initializeEndpoint,
    disableOnSuccessReload,
    onSubmitSuccess,
    onSubmit,
    renderDialog,
    fields,
    result,
    //to remove columnName from props variable
    // eslint-disable-next-line
    columnName,
    ...props
}: ResultButtonDialogFormProps) => {
    if (typeof result === "undefined") {
        throw new Error("ResultButtonDialogForm component: Missing required result prop");
    }

    const { reload } = useTable();
    const resolvedEndpoint: EndpointType = resolveAnyOrFunction(endpoint, result);
    const resolvedInitializeEndpoint: EndpointType = initializeEndpoint
        ? resolveAnyOrFunction(initializeEndpoint, result)
        : undefined;

    const internalOnSubmitSuccess = (defaultOnSubmitSuccess: () => void) => {
        defaultOnSubmitSuccess();

        if (!disableOnSuccessReload) {
            reload();
        }
    };

    // Lines below are written like that due to formatting issue
    let resolvedOnSubmitSuccess;
    if (onSubmitSuccess) {
        resolvedOnSubmitSuccess = (
            defaultOnSubmitSuccess: () => void,
            helpers: FormikHelpers<FormikValues>,
            response: AxiosResponse
        ) => onSubmitSuccess(() => internalOnSubmitSuccess(defaultOnSubmitSuccess), result, helpers, response);
    } else {
        resolvedOnSubmitSuccess = internalOnSubmitSuccess;
    }

    // Lines below are written like that due to formatting issue
    let resolvedOnSubmit:
        | ((values: FormikValues, helpers: FormikHelpers<FormikValues>, onClose: () => void) => void)
        | undefined = undefined;
    if (onSubmit) {
        resolvedOnSubmit = (values: FormikValues, helpers: FormikHelpers<FormikValues>, onClose: () => void) =>
            onSubmit(() => values, result, helpers, onClose);
    }

    // Lines below are written like that due to formatting issue
    let resolvedRenderDialog: ((params: ButtonDialogFormRenderDialogParams) => React.ReactNode) | undefined = undefined;
    if (renderDialog) {
        resolvedRenderDialog = (params: ButtonDialogFormRenderDialogParams) => renderDialog(params, result);
    }

    return (
        <ButtonDialogForm
            {...{
                formProps: {
                    endpoint: resolvedEndpoint,
                    initializeEndpoint: resolvedInitializeEndpoint,
                    onSubmitSuccess: resolvedOnSubmitSuccess,
                    onSubmit: resolvedOnSubmit,
                    fields: fields,
                },
                renderDialog: resolvedRenderDialog,
                deny: result?.deny,
                ...props,
            }}
        />
    );
};

export default ResultButtonDialogForm;
export { ResultButtonDialogFormProps, ResultButtonDialogFormSpecificProps };
