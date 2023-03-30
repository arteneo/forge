import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

type RequestExecutionExceptionSeverity = "warning" | "error";

// eslint-disable-next-line
type RequestExecutionExceptionPayload = any;

interface RequestExecutionExceptionErrorType {
    message: string;
    parameters?: TranslateVariablesInterface;
    severity: RequestExecutionExceptionSeverity;
}

interface RequestExecutionExceptionType {
    code: number;
    payload: RequestExecutionExceptionPayload;
    severity: RequestExecutionExceptionSeverity;
    errors: RequestExecutionExceptionErrorType[];
}

export {
    RequestExecutionExceptionSeverity,
    RequestExecutionExceptionPayload,
    RequestExecutionExceptionErrorType,
    RequestExecutionExceptionType,
};
