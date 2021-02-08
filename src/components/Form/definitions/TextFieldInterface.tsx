import { FormikValues, FormikTouched, FormikErrors } from "formik";
import FieldInterface from "forge-react/components/Form/definitions/FieldInterface";

interface TextFieldInterface extends FieldInterface {
    required?:
        | ((
              values: FormikValues,
              touched: FormikTouched<FormikValues>,
              errors: FormikErrors<FormikValues>,
              name: string
          ) => boolean)
        | boolean;
    // eslint-disable-next-line
    validationSchema?: any | (() => any);
}

export default TextFieldInterface;
