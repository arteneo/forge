import { FormikValues } from "formik";
import EndpointType from "../../../components/Form/definitions/EndpointType";

type FieldEndpointType = EndpointType | ((values: FormikValues) => EndpointType);

export default FieldEndpointType;
