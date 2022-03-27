import { FormikValues, FormikTouched, FormikErrors } from "formik";
import FieldInterface from "../../../components/Form/definitions/FieldInterface";

interface FieldResolveInterface extends Omit<FieldInterface, "transformInitialValue"> {
    values: FormikValues;
    touched: FormikTouched<FormikValues>;
    errors: FormikErrors<FormikValues>;
    submitCount: number;
}

export default FieldResolveInterface;
