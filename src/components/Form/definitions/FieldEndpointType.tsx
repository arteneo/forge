import { FormikValues } from "formik";
import EndpointType from "../../../definitions/EndpointType";

type FieldEndpointType = EndpointType | ((values: FormikValues) => EndpointType);

export default FieldEndpointType;
