import TranslateVariablesInterface from "../definitions/TranslateVariablesInterface";

type RequestExecutionSeverity = "warning" | "error";

// eslint-disable-next-line
type RequestExecutionExceptionPayload = any;

interface RequestExecutionExceptionErrorType {
    message: string;
    parameters?: TranslateVariablesInterface;
    executionSeverity: RequestExecutionSeverity;
}

interface RequestExecutionExceptionType {
    code: number;
    payload: RequestExecutionExceptionPayload;
    executionSeverity: RequestExecutionSeverity;
    errors: RequestExecutionExceptionErrorType[];
}

export {
    RequestExecutionSeverity,
    RequestExecutionExceptionPayload,
    RequestExecutionExceptionErrorType,
    RequestExecutionExceptionType,
};
