import { FormikValues } from "formik";
import { AxiosRequestConfig } from "axios";

type EndpointType =
    | undefined
    | string
    | AxiosRequestConfig
    | ((values: FormikValues) => undefined | string | AxiosRequestConfig);

export default EndpointType;
