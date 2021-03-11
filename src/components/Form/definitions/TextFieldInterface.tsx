import { FormikValues, FormikTouched, FormikErrors } from "formik";
import FieldInterface from "@arteneo/forge/components/Form/definitions/FieldInterface";
import FieldValidationSchemaType from "@arteneo/forge/components/Form/definitions/FieldValidationSchemaType";

interface TextFieldInterface extends FieldInterface {
    required?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    validationSchema?: FieldValidationSchemaType;
}

export default TextFieldInterface;
