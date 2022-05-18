import { FormikValues } from "formik";
import EndpointType from "../../../definitions/EndpointType";

type FieldAutocompleteEndpointType = EndpointType | ((inputValue: string, values: FormikValues) => EndpointType);

export default FieldAutocompleteEndpointType;
